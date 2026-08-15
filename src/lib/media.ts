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
  video.playsInline = true;
  video.preload = "auto";
  const objectUrl = URL.createObjectURL(file);
  video.src = objectUrl;

  try {
    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error("No se pudo leer el video"));
    });

    const duration = video.duration;
    if (!Number.isFinite(duration) || duration <= 0) {
      throw new Error("El video no tiene una duración válida");
    }

    const frames: Blob[] = [];

    for (let i = 0; i < count; i++) {
      // Se reparten los cuadros dejando un margen en los extremos: el primer y
      // el último instante suelen salir movidos o en negro.
      const t = ((i + 0.5) / count) * duration;

      await new Promise<void>((resolve, reject) => {
        video.onseeked = () => resolve();
        video.onerror = () => reject(new Error("Error al recorrer el video"));
        video.currentTime = t;
      });

      const canvas = drawScaled(video, video.videoWidth, video.videoHeight, maxSize);
      frames.push(await canvasToBlob(canvas));
      onProgress?.(i + 1, count);
    }

    return frames;
  } finally {
    video.onloadedmetadata = null;
    video.onseeked = null;
    video.onerror = null;
    video.removeAttribute("src");
    video.load();
    URL.revokeObjectURL(objectUrl);
  }
}
