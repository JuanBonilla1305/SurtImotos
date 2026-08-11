"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Moto = {
  id: string;
  brand: string;
  model: string;
  year: number;
  displacementCc: number;
  mileageKm: number | null;
  salePrice: unknown;
  photoUrl?: string | null;
};

export default function MotoCard({ moto, index = 0 }: { moto: Moto; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/catalogo/${moto.id}`}
        className="group block overflow-hidden rounded-xl border border-white/10 bg-brand-charcoal transition-shadow hover:shadow-[0_0_30px_-10px_rgba(245,97,14,0.6)]"
      >
        <div className="aspect-video overflow-hidden bg-black/40">
          {moto.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={moto.photoUrl}
              alt={`${moto.brand} ${moto.model}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-brand-chrome-dim">
              Sin foto
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="font-brand text-lg font-semibold uppercase italic text-white">
            {moto.brand} {moto.model}
          </p>
          <p className="mt-1 text-sm text-brand-chrome-dim">
            {moto.year} · {moto.displacementCc}cc
            {moto.mileageKm != null ? ` · ${moto.mileageKm.toLocaleString("es-CO")} km` : ""}
          </p>
          <p className="mt-3 text-xl font-bold text-brand-orange">
            ${Number(moto.salePrice).toLocaleString("es-CO")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
