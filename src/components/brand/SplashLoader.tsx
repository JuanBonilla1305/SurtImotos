"use client";

import { useEffect, useState } from "react";
import RunningMoto from "./RunningMoto";

const DISPLAY_SIZE = 240;

export default function SplashLoader({ label = "Cargando" }: { label?: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPct((p) => (p >= 100 ? 0 : Math.min(100, p + Math.ceil(Math.random() * 4))));
    }, 90);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: DISPLAY_SIZE, height: DISPLAY_SIZE }}>
        {/* estelas de velocidad */}
        <div className="absolute left-0 top-[38%] h-[3px] w-10 rounded-full bg-brand-orange splash-streak" style={{ animationDelay: "0s" }} />
        <div className="absolute left-0 top-[46%] h-[2px] w-14 rounded-full bg-brand-chrome splash-streak" style={{ animationDelay: "-0.18s" }} />
        <div className="absolute left-0 top-[54%] h-[2px] w-8 rounded-full bg-brand-orange splash-streak" style={{ animationDelay: "-0.3s" }} />
        <div className="absolute left-0 top-[62%] h-[2px] w-12 rounded-full bg-brand-chrome-dim splash-streak" style={{ animationDelay: "-0.44s" }} />

        <RunningMoto size={DISPLAY_SIZE} />
      </div>

      {/* carretera */}
      <div className="splash-road h-[2px] w-56" />

      <div className="flex w-56 flex-col gap-2">
        <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.3em] text-brand-chrome-dim">
          <span>{label}</span>
          <span className="font-bold tabular-nums text-brand-orange">{pct}%</span>
        </div>
        <div className="relative h-[5px] overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-orange to-brand-orange-light"
            style={{ width: `${pct}%` }}
          />
          <div className="splash-shine absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
