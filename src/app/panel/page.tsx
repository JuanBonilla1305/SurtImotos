import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Counter from "@/components/public/Counter";

const STATUS_STYLE: Record<string, string> = {
  DISPONIBLE: "bg-green-500/15 text-green-400",
  RESERVADA: "bg-amber-500/15 text-amber-400",
  VENDIDA: "bg-white/10 text-brand-chrome-dim",
};

const STATUS_LABEL: Record<string, string> = {
  DISPONIBLE: "Disponible",
  RESERVADA: "Reservada",
  VENDIDA: "Vendida",
};

export default async function DashboardPage() {
  const [availableCount, reservedCount, soldCount, totalCount, recentMotorcycles] =
    await Promise.all([
      prisma.motorcycle.count({ where: { status: "DISPONIBLE" } }),
      prisma.motorcycle.count({ where: { status: "RESERVADA" } }),
      prisma.motorcycle.count({ where: { status: "VENDIDA" } }),
      prisma.motorcycle.count(),
      prisma.motorcycle.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        include: { photos: { orderBy: { order: "asc" }, take: 1 } },
      }),
    ]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow flex items-center gap-3 text-brand-orange">
            <span className="h-px w-6 bg-brand-orange" />
            Panel de control
          </p>
          <h1 className="display mt-3 text-4xl text-white sm:text-5xl">Dashboard</h1>
          <p className="panel-muted mt-2 text-sm">Estado del inventario.</p>
        </div>

        <Link href="/panel/motos/nuevo" className="panel-btn-primary">
          + Nueva moto
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Disponibles" value={<Counter to={availableCount} />} accent />
        <StatCard label="Reservadas" value={<Counter to={reservedCount} />} />
        <StatCard label="Vendidas" value={<Counter to={soldCount} />} />
        <StatCard label="Total registradas" value={<Counter to={totalCount} />} />
      </div>

      <div className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display text-2xl text-white">Últimas motos ingresadas</h2>
          <Link
            href="/panel/motos"
            className="font-condensed text-xs font-bold uppercase tracking-[0.16em] text-brand-chrome-dim transition-colors hover:text-brand-orange"
          >
            Ver inventario →
          </Link>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recentMotorcycles.map((m) => (
            <Link
              key={m.id}
              href={`/panel/motos/${m.id}`}
              className="panel-card group flex items-center gap-4 p-3 hover:border-brand-orange/50"
            >
              <div className="h-16 w-20 shrink-0 overflow-hidden bg-black/40">
                {m.photos[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.photos[0].url}
                    alt=""
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="panel-muted flex h-full items-center justify-center text-[10px] uppercase tracking-widest">
                    Sin foto
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-condensed text-base font-semibold uppercase tracking-wide text-white transition-colors group-hover:text-brand-orange">
                  {m.brand} {m.model}
                </p>
                <p className="panel-muted mt-0.5 text-xs">
                  {m.year} · Placa {m.plate}
                </p>
                <span
                  className={`mt-1.5 inline-block px-2 py-0.5 font-condensed text-[10px] font-bold uppercase tracking-[0.16em] ${STATUS_STYLE[m.status]}`}
                >
                  {STATUS_LABEL[m.status]}
                </span>
              </div>
            </Link>
          ))}

          {recentMotorcycles.length === 0 && (
            <div className="panel-card col-span-full px-6 py-14 text-center">
              <p className="display text-xl text-white">Aún no hay motos registradas</p>
              <Link href="/panel/motos/nuevo" className="panel-btn-primary mt-5">
                Registrar la primera
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`panel-card relative overflow-hidden p-5 corner-cut hover:-translate-y-1 ${
        accent ? "border-brand-orange/40" : ""
      }`}
    >
      {accent && (
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-orange/20 blur-2xl" />
      )}
      <p className="eyebrow text-brand-chrome-dim">{label}</p>
      <p className={`display mt-3 text-4xl ${accent ? "text-brand-orange" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}
