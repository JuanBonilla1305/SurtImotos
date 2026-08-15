"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Píxeles que hay que arrastrar para avanzar un cuadro. */
const DRAG_SENSITIVITY = 12;

export default function SpinViewer({ frames, title }: { frames: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [dragging, setDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, index: 0 });
  // Solo marca si la vuelta de cortesía ya se hizo; no necesita provocar render.
  const hinted = useRef(false);

  const total = frames.length;
  const ready = loaded >= total;

  // Precarga: sin esto el giro parpadea la primera vuelta.
  useEffect(() => {
    let cancelled = false;
    let count = 0;

    frames.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (cancelled) return;
        count += 1;
        setLoaded(count);
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [frames]);

  // Al terminar de cargar, gira solo una vez para que se note que es arrastrable.
  useEffect(() => {
    if (!ready || hinted.current) return;
    hinted.current = true;

    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      setIndex((i) => (i + 1) % total);
      if (frame >= total) clearInterval(timer);
    }, 40);

    return () => clearInterval(timer);
  }, [ready, total]);

  const moveTo = useCallback(
    (clientX: number) => {
      const delta = Math.round((clientX - dragStart.current.x) / DRAG_SENSITIVITY);
      // El módulo de JS conserva el signo, así que se normaliza para poder
      // girar indefinidamente en ambos sentidos.
      setIndex(((dragStart.current.index - delta) % total + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (!dragging) return;

    const onMove = (e: PointerEvent) => moveTo(e.clientX);
    const onUp = () => setDragging(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, moveTo]);

  function startDrag(e: React.PointerEvent) {
    dragStart.current = { x: e.clientX, index };
    setDragging(true);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
    if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
  }

  const pct = total > 0 ? Math.round((loaded / total) * 100) : 0;

  return (
    <div>
      <div
        ref={containerRef}
        onPointerDown={startDrag}
        onKeyDown={onKeyDown}
        role="slider"
        tabIndex={0}
        aria-label={`Vista 360 de ${title}`}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={index + 1}
        className={`frame-marks relative aspect-[4/3] touch-none select-none overflow-hidden border border-white/10 bg-brand-charcoal ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="grid-floor absolute inset-0 opacity-50" />

        {frames.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt={i === index ? `${title} — vista 360` : ""}
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain p-3"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}

        <span className="absolute left-0 top-0 flex items-center gap-1.5 bg-brand-orange px-3 py-1 font-mono text-[11px] font-bold text-black">
          <RotateIcon className="h-3.5 w-3.5" />
          360°
        </span>

        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-black/80">
            <p className="eyebrow text-brand-chrome-dim">Cargando vista 360</p>
            <div className="h-[3px] w-40 overflow-hidden bg-white/10">
              <div
                className="h-full bg-brand-orange transition-[width] duration-200"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {ready && !dragging && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-4">
            <span className="flex items-center gap-2 bg-black/70 px-3 py-1.5 font-condensed text-[11px] font-bold uppercase tracking-[0.18em] text-brand-chrome backdrop-blur">
              ← Arrastra para girar →
            </span>
          </div>
        )}
      </div>

      {/* Barra de posición dentro de la vuelta */}
      <div className="mt-2 h-[3px] w-full bg-white/10">
        <div
          className="h-full bg-brand-orange/70"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function RotateIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={className} aria-hidden>
      <path d="M3 12a9 9 0 1 1 3 6.7" strokeLinecap="round" />
      <path d="M3 19v-5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
