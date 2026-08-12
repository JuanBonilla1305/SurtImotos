"use client";

import { motion } from "framer-motion";
import SpeedLines from "@/components/brand/SpeedLines";
import Logo from "@/components/brand/Logo";

export default function Hero({ availableCount }: { availableCount: number }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-brand-charcoal to-brand-black py-10">
      <SpeedLines className="absolute left-0 top-1/2 w-1/2 opacity-50" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Logo size={96} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange"
        >
          Compraventa de motos en Ibagué
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 text-sm text-brand-chrome"
        >
          {availableCount} moto{availableCount === 1 ? "" : "s"} disponible
          {availableCount === 1 ? "" : "s"} para ti hoy mismo.
        </motion.p>
      </div>
    </section>
  );
}
