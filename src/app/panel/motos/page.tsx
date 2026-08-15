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

const BADGE_BASE =
  "shrink-0 px-2 py-0.5 font-condensed text-[10px] font-bold uppercase tracking-[0.16em]";

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
      { brand: { contains: q, mode: "insensitive" } },
      { model: { contains: q, mode: "insensitive" } },
    ];
  }

  const motorcycles = await prisma.motorcycle.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { photos: { orderBy: [{ isSpin: "asc" }, { order: "asc" }], take: 1 } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="display text-3xl text-white sm:text-4xl">
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
          placeholder="Buscar por placa, marca o línea..."
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
            className="panel-card group block overflow-hidden corner-cut hover:-translate-y-1 hover:border-brand-orange/50"
          >
            <div className="relative aspect-video overflow-hidden bg-black/40">
              <div className="grid-floor absolute inset-0 opacity-40" />
              {moto.photos[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={moto.photos[0].url}
                  alt={`${moto.brand} ${moto.model}`}
                  loading="lazy"
                  className="relative h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="panel-muted relative flex h-full items-center justify-center font-condensed text-xs uppercase tracking-[0.2em]">
                  Sin foto
                </div>
              )}
              <span className={`absolute right-0 top-0 ${BADGE_BASE} ${STATUS_BADGE[moto.status]}`}>
                {STATUS_LABEL[moto.status]}
              </span>
            </div>

            <div className="p-4">
              <p className="font-condensed text-lg font-semibold uppercase tracking-wide text-white transition-colors group-hover:text-brand-orange">
                {moto.brand} {moto.model} · {moto.year}
              </p>
              <p className="panel-muted mt-1 text-xs uppercase tracking-[0.14em]">
                Placa {moto.plate} · {moto.displacementCc} cc
                {moto.mileageKm != null && ` · ${moto.mileageKm.toLocaleString("es-CO")} km`}
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
