import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [availableCount, reservedCount, salesThisMonth, recentMotorcycles] = await Promise.all([
    prisma.motorcycle.count({ where: { status: "DISPONIBLE" } }),
    prisma.motorcycle.count({ where: { status: "RESERVADA" } }),
    prisma.sale.findMany({ where: { soldAt: { gte: startOfMonth } } }),
    prisma.motorcycle.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const totalThisMonth = salesThisMonth.reduce((acc, s) => acc + Number(s.finalPrice), 0);

  return (
    <div>
      <h1 className="panel-heading font-brand text-2xl font-bold uppercase italic">
        Dashboard
      </h1>
      <p className="panel-muted mt-1 text-sm">Resumen general del local.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCard label="Disponibles" value={String(availableCount)} />
        <SummaryCard label="Reservadas" value={String(reservedCount)} />
        <SummaryCard label="Ventas este mes" value={String(salesThisMonth.length)} />
        <SummaryCard label="Facturado este mes" value={`$${totalThisMonth.toLocaleString("es-CO")}`} />
      </div>

      <div className="mt-8">
        <h2 className="panel-heading text-lg font-medium">Últimas motos ingresadas</h2>
        <div className="panel-table-wrap mt-3">
          <table className="panel-table">
            <tbody>
              {recentMotorcycles.map((m) => (
                <tr key={m.id}>
                  <td>
                    <Link href={`/panel/motos/${m.id}`} className="text-white hover:text-brand-orange">
                      {m.brand} {m.model} · {m.year}
                    </Link>
                  </td>
                  <td className="panel-muted">Placa {m.plate}</td>
                  <td className="panel-muted">{m.status}</td>
                </tr>
              ))}
              {recentMotorcycles.length === 0 && (
                <tr>
                  <td className="panel-muted py-8 text-center" colSpan={3}>
                    Aún no hay motos registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel-card p-4">
      <p className="panel-muted text-xs">{label}</p>
      <p className="panel-heading mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
