import { prisma } from "@/lib/prisma";
import MotoCard from "@/components/MotoCard";
import Hero from "@/components/Hero";

export const revalidate = 0;

export default async function HomePage() {
  const motorcycles = await prisma.motorcycle.findMany({
    where: { status: "DISPONIBLE" },
    orderBy: { createdAt: "desc" },
    include: { photos: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <div>
      <Hero />

      <section id="catalogo" className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-brand text-3xl font-bold uppercase italic text-white">
              Motos disponibles
            </h2>
            <p className="mt-1 text-sm text-brand-chrome-dim">
              {motorcycles.length} moto{motorcycles.length === 1 ? "" : "s"} lista
              {motorcycles.length === 1 ? "" : "s"} para rodar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {motorcycles.map((moto, index) => (
            <MotoCard
              key={moto.id}
              index={index}
              moto={{
                id: moto.id,
                brand: moto.brand,
                model: moto.model,
                year: moto.year,
                displacementCc: moto.displacementCc,
                mileageKm: moto.mileageKm,
                salePrice: Number(moto.salePrice),
                photoUrl: moto.photos[0]?.url,
              }}
            />
          ))}

          {motorcycles.length === 0 && (
            <p className="col-span-full py-16 text-center text-brand-chrome-dim">
              No hay motos disponibles en este momento. Vuelve pronto.
            </p>
          )}
        </div>
      </section>

      <HowToGetThere />
    </div>
  );
}

function HowToGetThere() {
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
    "Surti Motos Compra y Venta, Ibagué"
  )}&navigate=yes`;

  return (
    <section className="border-t border-white/10 bg-brand-charcoal py-14">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-brand text-2xl font-bold uppercase italic text-white sm:text-3xl">
          ¿Cómo llegar?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-chrome-dim">
          Visítanos en nuestro local en Ibagué. Toca el botón para que Waze te lleve
          directo hasta la puerta.
        </p>
        <a
          href={wazeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-orange px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-brand-orange-light brand-glow"
        >
          🧭 Cómo llegar con Waze
        </a>
      </div>
    </section>
  );
}
