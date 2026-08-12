import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

const STATUS_LABEL: Record<string, string> = {
  DISPONIBLE: "Disponible",
  RESERVADA: "Reservada",
  VENDIDA: "Vendida",
};

const STATUS_BADGE: Record<string, string> = {
  DISPONIBLE: "bg-green-500/15 text-green-400",
  RESERVADA: "bg-amber-500/15 text-amber-400",
  VENDIDA: "bg-white/10 text-brand-chrome-dim",
};

export default async function MotosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;

  const where: Prisma.MotorcycleWhereInput = {};
  if (status) where.status = status as Prisma.MotorcycleWhereInput["status"];
  if (q) {
    where.OR = [
      { plate: { contains: q, mode: "insensitive" } },
      { chassisNumber: { contains: q, mode: "insensitive" } },
      { brand: { contains: q, mode: "insensitive" } },
      { model: { contains: q, mode: "insensitive" } },
    ];
  }

  const motorcycles = await prisma.motorcycle.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { photos: { orderBy: { order: "asc" }, take: 1 } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="panel-heading font-brand text-2xl font-bold uppercase italic">
          Inventario de motos
        </h1>
        <Link href="/panel/motos/nuevo" className="panel-btn-primary">
          + Nueva moto
        </Link>
      </div>

      <form className="mt-4 flex flex-wrap gap-3">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Buscar por placa, chasis, marca o línea..."
          className="panel-input max-w-sm"
        />
        <select name="status" defaultValue={status ?? ""} className="panel-select w-auto">
          <option value="">Todos los estados</option>
          <option value="DISPONIBLE">Disponible</option>
          <option value="RESERVADA">Reservada</option>
          <option value="VENDIDA">Vendida</option>
        </select>
        <button type="submit" className="panel-btn-secondary">
          Filtrar
        </button>
      </form>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {motorcycles.map((moto) => (
          <Link
            key={moto.id}
            href={`/panel/motos/${moto.id}`}
            className="panel-card block overflow-hidden transition hover:border-brand-orange/40"
          >
            <div className="aspect-video bg-black/30">
              {moto.photos[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={moto.photos[0].url}
                  alt={`${moto.brand} ${moto.model}`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="panel-muted flex h-full items-center justify-center text-sm">
                  Sin foto
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="panel-heading font-medium">
                  {moto.brand} {moto.model} · {moto.year}
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[moto.status]}`}
                >
                  {STATUS_LABEL[moto.status]}
                </span>
              </div>
              <p className="panel-muted mt-1 text-sm">
                Placa {moto.plate} · {moto.displacementCc}cc
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-orange">
                ${Number(moto.salePrice).toLocaleString("es-CO")}
              </p>
            </div>
          </Link>
        ))}

        {motorcycles.length === 0 && (
          <p className="panel-muted col-span-full py-10 text-center">
            No hay motos que coincidan con el filtro.
          </p>
        )}
      </div>
    </div>
  );
}
