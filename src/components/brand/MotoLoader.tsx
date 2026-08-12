export default function MotoLoader({
  size = 80,
  label,
}: {
  size?: number;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size * 0.7 }}>
        <div className="moto-loader-bounce absolute inset-0">
          <svg viewBox="0 0 120 70" className="h-full w-full" fill="none">
            {/* cuerpo */}
            <path
              d="M22 50 L38 30 L60 30 L70 20 L88 20 L92 30 L78 32 L70 50"
              stroke="var(--brand-chrome)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* asiento */}
            <path d="M60 30 L48 30" stroke="var(--brand-chrome)" strokeWidth="4" strokeLinecap="round" />
            {/* faro */}
            <circle cx="90" cy="24" r="4" fill="var(--brand-orange)" />
            {/* rueda trasera */}
            <g className="moto-loader-wheel" style={{ transformOrigin: "22px 50px" }}>
              <circle cx="22" cy="50" r="14" stroke="var(--brand-chrome-dim)" strokeWidth="3" />
              <path d="M22 38 L22 62 M10 50 L34 50 M13 41 L31 59 M13 59 L31 41" stroke="var(--brand-chrome-dim)" strokeWidth="1.5" />
            </g>
            {/* rueda delantera */}
            <g className="moto-loader-wheel" style={{ transformOrigin: "78px 52px" }}>
              <circle cx="78" cy="52" r="14" stroke="var(--brand-orange)" strokeWidth="3" />
              <path d="M78 40 L78 64 M66 52 L90 52 M69 43 L87 61 M69 61 L87 43" stroke="var(--brand-orange)" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>

      {label && <p className="text-xs uppercase tracking-[0.2em] text-brand-chrome-dim">{label}</p>}

      <style>{`
        .moto-loader-wheel {
          animation: moto-loader-spin 0.8s linear infinite;
        }
        .moto-loader-bounce {
          animation: moto-loader-bounce 0.8s ease-in-out infinite;
        }
        @keyframes moto-loader-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes moto-loader-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}
