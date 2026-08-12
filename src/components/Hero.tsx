"use client";

import SpeedLines from "@/components/brand/SpeedLines";

export default function Hero() {
  return (
    <section className="relative h-28 overflow-hidden border-b border-white/10 bg-gradient-to-b from-brand-charcoal to-brand-black sm:h-32">
      <SpeedLines className="absolute inset-x-0 top-1/2 opacity-50" />
    </section>
  );
}
