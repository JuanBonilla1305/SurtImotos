"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export type Moto = {
  id: string;
  brand: string;
  model: string;
  year: number;
  displacementCc: number;
  mileageKm: number | null;
  salePrice: number;
  photoUrl?: string | null;
};

export default function MotoCard({ moto, index = 0 }: { moto: Moto; index?: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.35) }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      {/* Halo naranja en hover */}
      <div className="pointer-events-none absolute -inset-1 bg-brand-orange/0 blur-xl transition-all duration-500 group-hover:bg-brand-orange/20" />

      <Link
        href={`/catalogo/${moto.id}`}
        className="relative block h-full border border-white/10 bg-brand-charcoal transition-colors duration-300 corner-cut hover:border-brand-orange/50"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-black/50">
          <div className="grid-floor absolute inset-0 opacity-50" />

          {moto.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={moto.photoUrl}
              alt={`${moto.brand} ${moto.model}`}
              loading="lazy"
              className="relative h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            />
          ) : (
            <div className="relative flex h-full items-center justify-center font-condensed text-sm uppercase tracking-[0.2em] text-brand-chrome-dim">
              Sin foto
            </div>
          )}

          {/* Barrido de luz */}
          <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 group-hover:left-[110%]" />

          <span className="absolute left-0 top-0 bg-brand-orange px-2.5 py-1 font-mono text-[10px] font-bold text-black">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="absolute bottom-0 right-0 flex items-center gap-1.5 bg-black/70 px-2.5 py-1 font-condensed text-[10px] font-bold uppercase tracking-[0.18em] text-brand-chrome backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Disponible
          </span>
        </div>

        <div className="p-5">
          <h3 className="display text-2xl leading-none text-white transition-colors group-hover:text-brand-orange">
            {moto.brand} {moto.model}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-condensed text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-chrome-dim">
            <span>{moto.year}</span>
            <span className="h-1 w-1 rotate-45 bg-brand-orange/70" />
            <span>{moto.displacementCc} cc</span>
            {moto.mileageKm != null && (
              <>
                <span className="h-1 w-1 rotate-45 bg-brand-orange/70" />
                <span>{moto.mileageKm.toLocaleString("es-CO")} km</span>
              </>
            )}
          </div>

          <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
            <div>
              <p className="font-condensed text-[10px] uppercase tracking-[0.22em] text-brand-chrome-dim">
                Precio
              </p>
              <p className="display mt-0.5 text-2xl text-brand-orange">
                ${moto.salePrice.toLocaleString("es-CO")}
              </p>
            </div>

            <span className="flex items-center gap-1.5 font-condensed text-xs font-bold uppercase tracking-[0.16em] text-brand-chrome transition-colors group-hover:text-white">
              Ver ficha
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
