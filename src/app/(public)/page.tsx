import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import Ticker from "@/components/public/Ticker";
import { Catalogo, VendeTuMoto, Ubicacion } from "@/components/public/HomeSections";

export const revalidate = 0;

export default async function HomePage() {
  const motorcycles = await prisma.motorcycle.findMany({
    where: { status: "DISPONIBLE" },
    orderBy: { createdAt: "desc" },
    include: { photos: { orderBy: { order: "asc" }, take: 1 } },
  });

  const motos = motorcycles.map((moto) => ({
    id: moto.id,
    brand: moto.brand,
    model: moto.model,
    year: moto.year,
    displacementCc: moto.displacementCc,
    mileageKm: moto.mileageKm,
    photoUrl: moto.photos[0]?.url,
  }));

  return (
    <div>
      <Hero availableCount={motos.length} />
      <Ticker />
      <Catalogo motos={motos} />
      <VendeTuMoto whatsapp={process.env.NEXT_PUBLIC_CONTACT_WHATSAPP} />
      <Ubicacion />
    </div>
  );
}
