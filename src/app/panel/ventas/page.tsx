import Link from "next/link";
import { prisma } from "@/lib/prisma";

const PAYMENT_LABEL: Record<string, string> = {
  EFECTIVO: "Efectivo",
  TRANSFERENCIA: "Transferencia",
  FINANCIADO: "Financiado",
  MIXTO: "Mixto",
};

export default async function VentasPage() {
  const sales = await prisma.sale.findMany({
    orderBy: { soldAt: "desc" },
    include: { motorcycle: true, buyer: true, seller: true },
  });

  const now = new Date();
  const salesThisMonth = sales.filter(
    (s) => s.soldAt.getMonth() === now.getMonth() && s.soldAt.getFullYear() === now.getFullYear()
  );

  const totalThisMonth = salesThisMonth.reduce((acc, s) => acc + Number(s.finalPrice), 0);
  const profitThisMonth = salesThisMonth.reduce(
    (acc, s) => acc + (Number(s.finalPrice) - Number(s.motorcycle.purchasePrice ?? 0)),
    0
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="display text-3xl text-white sm:text-4xl">
          Ventas
        </h1>
        <Link href="/panel/ventas/nueva" className="panel-btn-primary">
          + Registrar venta
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Ventas este mes" value={String(salesThisMonth.length)} />
        <SummaryCard
          label="Facturado este mes"
          value={`$${totalThisMonth.toLocaleString("es-CO")}`}
        />
        <SummaryCard
          label="Ganancia estimada este mes"
          value={`$${profitThisMonth.toLocaleString("es-CO")}`}
        />
      </div>

      <div className="panel-table-wrap mt-6">
        <table className="panel-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Moto</th>
              <th>Comprador</th>
              <th>Vendedor</th>
              <th>Pago</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="panel-muted">{sale.soldAt.toLocaleDateString("es-CO")}</td>
                <td className="text-white">
                  {sale.motorcycle.brand} {sale.motorcycle.model} · {sale.motorcycle.plate}
                </td>
                <td className="text-white">{sale.buyer.name}</td>
                <td className="panel-muted">{sale.seller.name}</td>
                <td className="panel-muted">{PAYMENT_LABEL[sale.paymentMethod]}</td>
                <td className="font-medium text-brand-orange">
                  ${Number(sale.finalPrice).toLocaleString("es-CO")}
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan={6} className="panel-muted py-8 text-center">
                  Aún no se han registrado ventas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel-card p-5 corner-cut">
      <p className="eyebrow text-brand-chrome-dim">{label}</p>
      <p className="display mt-3 text-2xl text-white">{value}</p>
    </div>
  );
}
