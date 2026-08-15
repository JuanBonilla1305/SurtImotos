import { prisma } from "@/lib/prisma";
import TramitesPanel from "@/components/TramitesPanel";

export default async function TramitesPage() {
  const motorcycles = await prisma.motorcycle.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      brand: true,
      model: true,
      plate: true,
      chassisNumber: true,
      engineNumber: true,
    },
  });

  return (
    <div>
      <h1 className="display text-3xl text-white sm:text-4xl">
        Trámites
      </h1>
      <p className="panel-muted mt-1 text-sm">
        Accesos rápidos a los portales oficiales. Se abren en una pestaña nueva porque no
        permiten mostrarse dentro de otros sitios.
      </p>

      <div className="mt-6">
        <TramitesPanel motorcycles={motorcycles} />
      </div>
    </div>
  );
}
