/**
 * Utilidades de navegador para preparar imágenes antes de subirlas a Supabase.
 * Las fotos de celular pesan 4-8 MB cada una; sin comprimir, una ficha con
 * galería y giro 360 sería inusable con datos móviles.
 */

const JPEG_QUALITY = 0.82;

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("No se pudo generar la imagen"))),
      "image/jpeg",
      JPEG_QUALITY
    );
  });
}

/** Dibuja la fuente en un canvas reescalado para que su lado mayor sea maxSize. */
function drawScaled(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  maxSize: number
): HTMLCanvasElement {
  const scale = Math.min(1, maxSize / Math.max(sourceWidth, sourceHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(sourceWidth * scale);
  canvas.height = Math.round(sourceHeight * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("El navegador no soporta canvas 2D");
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

  return canvas;
}

/** Reescala y recomprime una foto. Devuelve el original si algo falla. */
export async function compressImage(file: File, maxSize = 1600): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const canvas = drawScaled(bitmap, bitmap.width, bitmap.height, maxSize);
    bitmap.close();
    return await canvasToBlob(canvas);
  } catch {
    return file;
  }
}

/** Espera un evento del video, con tope de tiempo para no colgarse en silencio. */
function waitForEvent(
  video: HTMLVideoElement,
  event: string,
  timeoutMs: number,
  timeoutMessage: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      clearTimeout(timer);
      video.removeEventListener(event, onDone);
      video.removeEventListener("error", onError);
    };
    const onDone = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("El navegador no pudo decodificar el video."));
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(timeoutMessage));
    }, timeoutMs);

    video.addEventListener(event, onDone, { once: true });
    video.addEventListener("error", onError, { once: true });
  });
}

/**
 * Los videos grabados por la cámara del navegador suelen reportar duración
 * infinita hasta que se los recorre. Saltar al final la fuerza a resolverse.
 */
async function resolveDuration(video: HTMLVideoElement): Promise<number> {
  if (Number.isFinite(video.duration) && video.duration > 0) return video.duration;

  await new Promise<void>((resolve) => {
    const onUpdate = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        video.removeEventListener("timeupdate", onUpdate);
        resolve();
      }
    };
    video.addEventListener("timeupdate", onUpdate);
    video.currentTime = 1e6;
    setTimeout(() => {
      video.removeEventListener("timeupdate", onUpdate);
      resolve();
    }, 5000);
  });

  video.currentTime = 0;
  return Number.isFinite(video.duration) ? video.duration : 0;
}

/** Salta a un instante y espera a que el fotograma esté disponible para pintar. */
async function seekTo(video: HTMLVideoElement, time: number): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      clearTimeout(timer);
      video.removeEventListener("seeked", onSeeked);
    };
    const onSeeked = () => {
      cleanup();
      resolve();
    };
    const timer = setTimeout(() => {
      cleanup();
      reject(
        new Error(
          `El video se quedó atascado en el segundo ${time.toFixed(1)}. Puede estar en un formato que este navegador no maneja bien.`
        )
      );
    }, 15000);

    video.addEventListener("seeked", onSeeked, { once: true });
    video.currentTime = time;
  });

  // `seeked` avisa de que la posición cambió, no de que el cuadro ya se pueda
  // dibujar. Cuando existe, esta API sí garantiza que hay fotograma.
  const withCallback = video as HTMLVideoElement & {
    requestVideoFrameCallback?: (cb: () => void) => number;
  };

  if (typeof withCallback.requestVideoFrameCallback === "function") {
    await new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, 500);
      withCallback.requestVideoFrameCallback!(() => {
        clearTimeout(timer);
        resolve();
      });
    });
  }
}

/**
 * Extrae `count` fotogramas repartidos por toda la duración del video.
 * Se usa para el giro 360: el usuario graba una vuelta a la moto y de ahí
 * salen los cuadros ya ordenados.
 */
export async function extractVideoFrames(
  file: File,
  count: number,
  maxSize: number,
  onProgress?: (done: number, total: number) => void
): Promise<Blob[]> {
  const video = document.createElement("video");
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.preload = "auto";

  // Varios navegadores no decodifican un <video> que no está en el documento,
  // así que se inserta fuera de pantalla en vez de oculto con display:none.
  Object.assign(video.style, {
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: "1px",
    height: "1px",
    opacity: "0",
    pointerEvents: "none",
  });
  document.body.appendChild(video);

  const objectUrl = URL.createObjectURL(file);
  video.src = objectUrl;

  try {
    await waitForEvent(
      video,
      "loadedmetadata",
      30000,
      "No se pudieron leer los datos del video. Si lo grabaste con iPhone en «Alta eficiencia», cámbialo a «Más compatible» o pásalo por WhatsApp."
    );

    const duration = await resolveDuration(video);
    if (duration <= 0) {
      throw new Error("El video no tiene una duración válida.");
    }

    // Arrancar la reproducción fuerza al navegador a bajar datos; sin esto los
    // saltos pueden quedarse esperando indefinidamente.
    try {
      await video.play();
      video.pause();
    } catch {
      // Si la política de autoplay lo bloquea, se sigue: el salto suele bastar.
    }

    if (video.readyState < 2) {
      await waitForEvent(
        video,
        "loadeddata",
        30000,
        "El video tardó demasiado en cargar. Intenta con uno más corto o de menor resolución."
      );
    }

    if (!video.videoWidth || !video.videoHeight) {
      throw new Error("El video no tiene imagen legible en este navegador.");
    }

    const frames: Blob[] = [];

    for (let i = 0; i < count; i++) {
      // Se reparten los cuadros dejando un margen en los extremos: el primer y
      // el último instante suelen salir movidos o en negro.
      const t = ((i + 0.5) / count) * duration;

      await seekTo(video, t);

      const canvas = drawScaled(video, video.videoWidth, video.videoHeight, maxSize);
      frames.push(await canvasToBlob(canvas));
      onProgress?.(i + 1, count);
    }

    return frames;
  } finally {
    video.pause();
    video.removeAttribute("src");
    video.load();
    video.remove();
    URL.revokeObjectURL(objectUrl);
  }
}
