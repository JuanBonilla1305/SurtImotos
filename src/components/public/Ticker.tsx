const DEFAULT_ITEMS = [
  "Compra y venta de motos",
  "Traspasos y trámites",
  "Avalúo gratis",
  "Recibimos tu moto en parte de pago",
  "Papeles al día",
  "Ibagué · Tolima",
];

export default function Ticker({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-brand-charcoal py-3">
      <div className="marquee-track">
        {loop.map((text, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-6 px-6 font-condensed text-sm font-semibold uppercase tracking-[0.22em] text-brand-chrome-dim"
          >
            {text}
            <span className="h-1.5 w-1.5 rotate-45 bg-brand-orange" />
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-charcoal to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-charcoal to-transparent" />
    </div>
  );
}
