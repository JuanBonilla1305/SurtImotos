"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SpeedLines from "@/components/brand/SpeedLines";

export default function Hero({ availableCount }: { availableCount: number }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-brand-charcoal to-brand-black py-20">
      <SpeedLines className="absolute left-0 top-1/3 w-1/2 opacity-70" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-orange"
        >
          Compraventa de motos en Ibagué
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 font-brand text-5xl font-bold uppercase italic leading-tight text-white sm:text-6xl"
        >
          Compra<span className="text-brand-orange">venta</span> Surti Motos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-brand-chrome"
        >
          Compramos, vendemos y financiamos motos usadas y nuevas. {availableCount} moto
          {availableCount === 1 ? "" : "s"} disponible{availableCount === 1 ? "" : "s"} para ti
          hoy mismo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Link
            href="#catalogo"
            className="inline-flex items-center rounded-md bg-brand-orange px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-brand-orange-light"
          >
            Ver catálogo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
