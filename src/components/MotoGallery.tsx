"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MotoGallery({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-brand-charcoal text-brand-chrome-dim">
        Sin fotos
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-brand-charcoal">
        <AnimatePresence mode="wait">
          <motion.img
            key={photos[active]}
            src={photos[active]}
            alt={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full object-contain"
          />
        </AnimatePresence>
      </div>

      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {photos.map((url, index) => (
            <button
              key={url}
              type="button"
              onClick={() => setActive(index)}
              className={`aspect-square overflow-hidden rounded-md border-2 bg-brand-charcoal transition ${
                index === active ? "border-brand-orange" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
