import Link from "next/link";
import CatalogGrid from "@/components/public/CatalogGrid";
import Reveal from "@/components/public/Reveal";
import type { Moto } from "@/components/MotoCard";

export function Catalogo({ motos }: { motos: Moto[] }) {
  return (
    <section id="catalogo" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-brand-orange/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-3 text-brand-orange">
              <span className="h-px w-8 bg-brand-orange" />
              El inventario
            </p>
            <h2 className="display mt-4 text-5xl text-white sm:text-6xl lg:text-7xl">
              Motos <span className="text-stroke-orange">listas</span>
              <br />
              para rodar
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-brand-chrome-dim">
            {motos.length === 0
              ? "Inventario en actualización."
              : `${motos.length} ${motos.length === 1 ? "moto revisada" : "motos revisadas"}, con papeles al día y precio cerrado. Filtra por marca o precio.`}
          </p>
        </Reveal>

        <CatalogGrid motos={motos} />
      </div>
    </section>
  );
}

const PASOS = [
  {
    n: "01",
    title: "Nos escribes",
    body: "Mándanos fotos, placa y kilometraje por WhatsApp. Sin compromiso.",
  },
  {
    n: "02",
    title: "Avaluamos",
    body: "Revisamos la moto y los papeles, y te damos una oferta real el mismo día.",
  },
  {
    n: "03",
    title: "Cerramos",
    body: "Pago inmediato y nosotros nos encargamos del traspaso y los trámites.",
  },
];

export function VendeTuMoto({ whatsapp }: { whatsapp?: string }) {
  const message = encodeURIComponent("Hola, quiero vender mi moto y me gustaría un avalúo.");

  return (
    <section
      id="vender"
      className="grain relative overflow-hidden border-y border-white/10 bg-brand-charcoal py-20 sm:py-28"
    >
      <div className="hazard-soft pointer-events-none absolute inset-y-0 left-0 hidden w-16 opacity-40 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-brand-orange">
                <span className="h-px w-8 bg-brand-orange" />
                Vende tu moto
              </p>
              <h2 className="display mt-4 text-5xl text-white sm:text-6xl">
                Te la compramos
                <br />
                <span className="text-brand-orange">hoy mismo</span>
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-brand-chrome-dim">
                No la dejes parqueada perdiendo valor. Avaluamos, pagamos de contado y
                asumimos el traspaso. Tú solo entregas las llaves.
              </p>

              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-signal mt-8"
                >
                  Pedir avalúo gratis
                  <span aria-hidden>→</span>
                </a>
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-3">
              {PASOS.map((paso, i) => (
                <Reveal key={paso.n} delay={i * 0.1}>
                  <div className="group relative h-full border border-white/10 bg-brand-black p-6 transition-colors duration-300 corner-cut hover:border-brand-orange/50">
                    <p className="display text-5xl text-white/10 transition-colors duration-300 group-hover:text-brand-orange/40">
                      {paso.n}
                    </p>
                    <h3 className="display mt-3 text-xl text-white">{paso.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-chrome-dim">
                      {paso.body}
                    </p>
                    <div className="mt-5 h-px w-full bg-white/10">
                      <div className="h-px w-0 bg-brand-orange transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Ubicacion() {
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
    "Surti Motos Compra y Venta, Ibagué"
  )}&navigate=yes`;

  return (
    <section id="ubicacion" className="relative overflow-hidden py-20 sm:py-28">
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/12 blur-[120px] animate-glow-breathe" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow text-brand-orange">Cómo llegar</p>
          <h2 className="display mt-4 text-5xl text-white sm:text-6xl lg:text-7xl">
            Te esperamos
            <br />
            en <span className="text-brand-orange">Ibagué</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-brand-chrome-dim">
            Pásate por el local, mira las motos en vivo y pruébalas. Toca el botón y Waze
            te lleva directo hasta la puerta.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className="btn-signal">
              <PinIcon className="h-4 w-4" />
              Abrir en Waze
            </a>
            <Link href="#catalogo" className="btn-ghost">
              Ver catálogo
            </Link>
          </div>

          <dl className="mx-auto mt-14 grid max-w-xl grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            <InfoCell label="Ciudad" value="Ibagué, Tolima" />
            <InfoCell label="Horario" value="Lun – Sáb · 8am a 6pm" />
            <InfoCell label="Atención" value="Directa, sin intermediarios" />
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-brand-charcoal px-5 py-6">
      <dt className="eyebrow text-brand-chrome-dim">{label}</dt>
      <dd className="mt-2 font-condensed text-base font-semibold uppercase tracking-wide text-white">
        {value}
      </dd>
    </div>
  );
}

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}
