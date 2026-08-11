import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MotoGallery from "@/components/MotoGallery";

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

  const whatsappNumber = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP;
  const message = encodeURIComponent(
    `Hola, estoy interesado en la ${moto.brand} ${moto.model} ${moto.year} (placa ${moto.plate}) que vi en el catálogo.`
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <MotoGallery
          photos={moto.photos.map((p) => p.url)}
          title={`${moto.brand} ${moto.model}`}
        />

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-orange">
            {moto.year} · {moto.displacementCc}cc
          </p>
          <h1 className="mt-2 font-brand text-4xl font-bold uppercase italic text-white">
            {moto.brand} {moto.model}
          </h1>
          <p className="mt-4 text-3xl font-bold text-brand-orange">
            ${Number(moto.salePrice).toLocaleString("es-CO")}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-white/10 pt-6 text-sm">
            <Spec label="Color" value={moto.color ?? "—"} />
            <Spec
              label="Kilometraje"
              value={
                moto.mileageKm != null ? `${moto.mileageKm.toLocaleString("es-CO")} km` : "—"
              }
            />
            <Spec label="Placa" value={moto.plate} />
            <Spec label="Cilindraje" value={`${moto.displacementCc}cc`} />
          </dl>

          {moto.description && (
            <p className="mt-6 text-brand-chrome">{moto.description}</p>
          )}

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center rounded-md bg-brand-orange px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-brand-orange-light"
            >
              Contactar por WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-brand-chrome-dim">{label}</dt>
      <dd className="font-medium text-white">{value}</dd>
    </div>
  );
}
