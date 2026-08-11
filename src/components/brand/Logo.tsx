"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{
        opacity: 1,
        scale: [0.8, 1.05, 1],
        rotate: 0,
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative inline-flex shrink-0"
      style={{ width: size, height: size }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-brand-orange blur-md"
        animate={{ opacity: [0.15, 0.5, 0.15], scale: [0.85, 1.05, 0.85] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <Image
        src="/brand/logo.jpeg"
        alt="Compraventa Surtimotos"
        width={size}
        height={size}
        className="rounded-md object-cover"
        priority
      />
    </motion.div>
  );
}
