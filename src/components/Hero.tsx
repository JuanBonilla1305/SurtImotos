"use client";

import SpeedLines from "@/components/brand/SpeedLines";
import RunningMoto from "@/components/brand/RunningMoto";

export default function Hero() {
  return (
    <section className="relative h-28 overflow-hidden border-b border-white/10 bg-gradient-to-b from-brand-charcoal to-brand-black sm:h-32">
      <SpeedLines className="absolute left-0 top-1/2 w-2/5 opacity-50" />
      <SpeedLines className="absolute right-0 top-1/2 w-2/5 origin-center scale-x-[-1] opacity-50" />

      <div className="absolute inset-0 flex items-center justify-center">
        <RunningMoto size={84} />
      </div>
    </section>
  );
}
