import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MotoGallery from "@/components/MotoGallery";
import SpinViewer from "@/components/SpinViewer";
import MotoCard from "@/components/MotoCard";
import Reveal from "@/components/public/Reveal";

export const revalidate = 0;

export default async function CatalogoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const moto = await prisma.motorcycle.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  if (!moto || moto.status !== "DISPONIBLE") notFound();

  const spinFrames = moto.photos.filter((p) => p.isSpin).map((p) => p.url);
  const galleryPhotos = moto.photos.filter((p) => !p.isSpin).map((p) => p.url);

  const related = await prisma.motorcycle.findMany({
    where: { status: "DISPONIBLE", id: { not: moto.id } },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { photos: { where: { isSpin: false }, orderBy: { order: "asc" }, take: 1 } },
  });

  const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP;
  const message = encodeURIComponent(
    `Hola, estoy interesado en la ${moto.brand} ${moto.model} ${moto.year} (placa ${moto.plate}) que vi en el catálogo.`
  );

  return (
    <div className="relative overflow-hidden pt-28">
      <div className="grid-floor pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-40 h-[420px] w-[420px] rounded-full bg-brand-orange/12 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <Link
          href="/#catalogo"
          className="group inline-flex items-center gap-2 font-condensed text-xs font-bold uppercase tracking-[0.2em] text-brand-chrome-dim transition-colors hover:text-brand-orange"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Volver al catálogo
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              {spinFrames.length > 0 ? (
                <div className="space-y-6">
                  <SpinViewer
                    frames={spinFrames}
                    title={`${moto.brand} ${moto.model}`}
                  />

                  {galleryPhotos.length > 0 && (
                    <div>
                      <p className="eyebrow mb-3 text-brand-chrome-dim">Fotos</p>
                      <MotoGallery
                        photos={galleryPhotos}
                        title={`${moto.brand} ${moto.model}`}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <MotoGallery
                  photos={galleryPhotos}
                  title={`${moto.brand} ${moto.model}`}
                />
              )}
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 bg-green-500/15 px-2.5 py-1 font-condensed text-[10px] font-bold uppercase tracking-[0.2em] text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Disponible
                </span>
                <p className="eyebrow text-brand-chrome-dim">
                  {moto.year} · {moto.displacementCc} cc
                </p>
              </div>

              <h1 className="display mt-4 text-5xl text-white sm:text-6xl">
                {moto.brand}
                <br />
                <span className="text-brand-orange">{moto.model}</span>
              </h1>

              <div className="mt-7 border border-white/10 bg-brand-charcoal p-5 corner-cut">
                <p className="eyebrow text-brand-chrome-dim">Precio</p>
                <p className="display mt-1 text-3xl text-white">Consúltanos</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-chrome-dim">
                  Te damos el precio y la disponibilidad al momento por WhatsApp.
                </p>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
                <Spec label="Cilindraje" value={`${moto.displacementCc} cc`} />
                <Spec label="Modelo" value={String(moto.year)} />
                <Spec
                  label="Kilometraje"
                  value={
                    moto.mileageKm != null
                      ? `${moto.mileageKm.toLocaleString("es-CO")} km`
                      : "—"
                  }
                />
                <Spec label="Color" value={moto.color ?? "—"} />
                <Spec label="Placa" value={moto.plate} />
                <Spec label="Marca" value={moto.brand} />
              </dl>

              {moto.description && (
                <div className="mt-6 border-l-2 border-brand-orange pl-4">
                  <p className="eyebrow text-brand-chrome-dim">Detalles</p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-chrome">
                    {moto.description}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {whatsappNumber && (
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-signal flex-1"
                  >
                    Preguntar por esta moto
                  </a>
                )}
                <Link href="/#ubicacion" className="btn-ghost">
                  Verla en el local
                </Link>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-brand-chrome-dim">
                Papeles verificados y traspaso incluido. Recibimos tu moto usada en parte de
                pago.
              </p>
            </Reveal>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <Reveal className="mb-8 flex items-end justify-between gap-4">
              <h2 className="display text-3xl text-white sm:text-4xl">También te puede servir</h2>
              <Link
                href="/#catalogo"
                className="hidden font-condensed text-xs font-bold uppercase tracking-[0.2em] text-brand-chrome-dim transition-colors hover:text-brand-orange sm:block"
              >
                Ver todas →
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <MotoCard
                  key={item.id}
                  index={index}
                  moto={{
                    id: item.id,
                    brand: item.brand,
                    model: item.model,
                    year: item.year,
                    displacementCc: item.displacementCc,
                    mileageKm: item.mileageKm,
                    photoUrl: item.photos[0]?.url,
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-brand-charcoal px-4 py-3.5">
      <dt className="eyebrow text-brand-chrome-dim">{label}</dt>
      <dd className="mt-1.5 font-condensed text-base font-semibold uppercase tracking-wide text-white">
        {value}
      </dd>
    </div>
  );
}
