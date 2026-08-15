import Link from "next/link";
import Logo from "@/components/brand/Logo";

const WAZE_URL = `https://waze.com/ul?q=${encodeURIComponent(
  "Surti Motos Compra y Venta, Ibagué"
)}&navigate=yes`;

export default function SiteFooter({ whatsapp }: { whatsapp?: string }) {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-brand-charcoal">
      <div className="hazard h-[3px] opacity-70" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Logo size={52} />
              <div className="leading-[0.95]">
                <p className="display text-2xl text-white">
                  Surti<span className="text-brand-orange">motos</span>
                </p>
                <p className="eyebrow mt-1 text-brand-chrome-dim">Compraventa · Ibagué</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-chrome-dim">
              Compramos, vendemos y ponemos al día los papeles de tu moto. Atención directa,
              sin intermediarios y con precios de verdad.
            </p>
          </div>

          <div>
            <p className="eyebrow text-brand-orange">Navegación</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/#catalogo", label: "Catálogo" },
                { href: "/#vender", label: "Vende tu moto" },
                { href: "/#ubicacion", label: "Cómo llegar" },
                { href: "/login", label: "Panel interno" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-brand-chrome transition-colors hover:text-brand-orange"
                  >
                    <span className="h-px w-3 bg-brand-orange transition-all duration-300 group-hover:w-6" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-brand-orange">Contacto</p>
            <ul className="mt-4 space-y-3 text-sm text-brand-chrome">
              {whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-brand-orange"
                  >
                    WhatsApp directo
                  </a>
                </li>
              )}
              <li>
                <a
                  href={WAZE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-orange"
                >
                  Abrir en Waze
                </a>
              </li>
              <li className="text-brand-chrome-dim">Ibagué, Tolima · Colombia</li>
              <li className="text-brand-chrome-dim">Lun a Sáb · 8:00 a.m. – 6:00 p.m.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-brand-chrome-dim sm:flex-row">
          <p>© {new Date().getFullYear()} Compraventa Surti Motos · Ibagué, Colombia</p>
          <p className="font-condensed uppercase tracking-[0.24em]">Hecho para rodar</p>
        </div>
      </div>

      <p
        aria-hidden
        className="display text-stroke pointer-events-none select-none whitespace-nowrap px-4 text-center text-[18vw] leading-[0.75] opacity-[0.07]"
      >
        Surtimotos
      </p>
    </footer>
  );
}
