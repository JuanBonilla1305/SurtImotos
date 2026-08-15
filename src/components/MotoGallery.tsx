"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MotoGallery({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [[active, direction], setActive] = useState<[number, number]>([0, 0]);

  const go = useCallback(
    (next: number) => {
      if (photos.length === 0) return;
      const wrapped = (next + photos.length) % photos.length;
      setActive(([current]) => [wrapped, wrapped > current ? 1 : -1]);
    },
    [photos.length]
  );

  useEffect(() => {
    if (photos.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(active + 1);
      if (e.key === "ArrowLeft") go(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go, photos.length]);

  if (photos.length === 0) {
    return (
      <div className="frame-marks flex aspect-[4/3] items-center justify-center border border-white/10 bg-brand-charcoal font-condensed uppercase tracking-[0.2em] text-brand-chrome-dim">
        Sin fotos
      </div>
    );
  }

  return (
    <div>
      <div className="frame-marks group relative aspect-[4/3] overflow-hidden border border-white/10 bg-brand-charcoal">
        <div className="grid-floor absolute inset-0 opacity-50" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={photos[active]}
            src={photos[active]}
            alt={title}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full w-full object-contain p-3"
          />
        </AnimatePresence>

        <span className="absolute left-0 top-0 bg-brand-orange px-3 py-1 font-mono text-[11px] font-bold text-black">
          {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>

        {photos.length > 1 && (
          <>
            <ArrowButton side="left" onClick={() => go(active - 1)} />
            <ArrowButton side="right" onClick={() => go(active + 1)} />
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {photos.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => go(index)}
              aria-label={`Foto ${index + 1}`}
              className={`relative aspect-square overflow-hidden border bg-brand-charcoal transition-all duration-300 ${
                index === active
                  ? "border-brand-orange opacity-100"
                  : "border-white/10 opacity-55 hover:opacity-90"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" loading="lazy" className="h-full w-full object-contain p-1" />
              {index === active && (
                <motion.span
                  layoutId="thumb-active"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-orange"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ArrowButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Foto anterior" : "Foto siguiente"}
      className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/60 text-lg text-white opacity-0 backdrop-blur transition-all duration-300 hover:border-brand-orange hover:bg-brand-orange hover:text-black group-hover:opacity-100 ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      {side === "left" ? "←" : "→"}
    </button>
  );
}
