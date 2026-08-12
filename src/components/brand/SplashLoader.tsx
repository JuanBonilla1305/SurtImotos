"use client";

import { useEffect, useState } from "react";

// Coordenadas del logo fuente (500x500) obtenidas por análisis de píxeles.
const SOURCE_SIZE = 500;
const WHEELS = [
  { cx: 151, cy: 226.5, r: 44 }, // rueda trasera
  { cx: 404, cy: 225, r: 43 }, // rueda delantera
];

const DISPLAY_SIZE = 240;
const SCALE = DISPLAY_SIZE / SOURCE_SIZE;

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

        {/* cuerpo de la moto */}
        <div
          className="absolute inset-0 splash-bob"
          style={{
            backgroundImage: "url(/brand/logo-transparent.png)",
            backgroundSize: `${DISPLAY_SIZE}px ${DISPLAY_SIZE}px`,
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* ruedas girando */}
        {WHEELS.map((w, i) => {
          const size = 2 * w.r * SCALE;
          const left = (w.cx - w.r) * SCALE;
          const top = (w.cy - w.r) * SCALE;
          return (
            <div
              key={i}
              className="absolute overflow-hidden rounded-full"
              style={{ width: size, height: size, left, top }}
            >
              <div
                className="splash-spin"
                style={{
                  position: "absolute",
                  width: DISPLAY_SIZE,
                  height: DISPLAY_SIZE,
                  left: -left,
                  top: -top,
                  backgroundImage: "url(/brand/wheels-layer.png)",
                  backgroundSize: `${DISPLAY_SIZE}px ${DISPLAY_SIZE}px`,
                  backgroundRepeat: "no-repeat",
                  transformOrigin: `${w.cx * SCALE}px ${w.cy * SCALE}px`,
                }}
              />
            </div>
          );
        })}
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

      <style>{`
        @keyframes splash-bob-kf {
          0% { transform: translate(0,0) rotate(-0.4deg); }
          25% { transform: translate(-2px,-3px) rotate(0.3deg); }
          50% { transform: translate(1px,1px) rotate(-0.2deg); }
          75% { transform: translate(-1px,-2px) rotate(0.5deg); }
          100% { transform: translate(0,0) rotate(-0.4deg); }
        }
        .splash-bob { animation: splash-bob-kf 0.32s steps(4, end) infinite; }

        @keyframes splash-spin-kf { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        .splash-spin { animation: splash-spin-kf 0.36s linear infinite; }

        @keyframes splash-streak-kf {
          0% { transform: translateX(0) scaleX(1); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateX(-40px) scaleX(1.7); opacity: 0; }
        }
        .splash-streak { animation: splash-streak-kf 0.6s linear infinite; }

        @keyframes splash-road-kf { from { background-position: 0 0; } to { background-position: -56px 0; } }
        .splash-road {
          background: repeating-linear-gradient(90deg, #3a3a3a 0 8px, transparent 8px 16px);
          animation: splash-road-kf 0.4s linear infinite;
        }

        @keyframes splash-shine-kf { from { transform: translateX(-120%); } to { transform: translateX(420%); } }
        .splash-shine { animation: splash-shine-kf 1.3s linear infinite; }
      `}</style>
    </div>
  );
}
