"use client";

import { motion } from "framer-motion";
import SpeedLines from "@/components/brand/SpeedLines";

export default function Hero({ availableCount }: { availableCount: number }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-brand-charcoal to-brand-black py-10">
      <SpeedLines className="absolute inset-x-0 top-1/2 opacity-50" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-brand-chrome"
        >
          {availableCount} moto{availableCount === 1 ? "" : "s"} disponible
          {availableCount === 1 ? "" : "s"} para ti hoy mismo.
        </motion.p>
      </div>
    </section>
  );
}
