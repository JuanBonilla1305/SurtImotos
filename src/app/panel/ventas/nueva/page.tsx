import { prisma } from "@/lib/prisma";
import { createSale } from "@/lib/actions/sales";
import Link from "next/link";

export default async function NuevaVentaPage() {
  const [availableMotorcycles, clients] = await Promise.all([
    prisma.motorcycle.findMany({
      where: { status: { in: ["DISPONIBLE", "RESERVADA"] } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
  ]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="max-w-lg">
      <h1 className="display text-3xl text-white sm:text-4xl">
        Registrar venta
      </h1>

      {availableMotorcycles.length === 0 ? (
        <p className="panel-muted mt-4 text-sm">No hay motos disponibles para vender.</p>
      ) : (
        <form action={createSale} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="panel-label">Moto *</label>
            <select name="motorcycleId" required className="panel-select">
              <option value="">— Selecciona una moto —</option>
              {availableMotorcycles.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.brand} {m.model} {m.year} · Placa {m.plate} · $
                  {Number(m.salePrice).toLocaleString("es-CO")}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="panel-label">Cliente comprador *</label>
            {clients.length === 0 ? (
              <p className="panel-muted text-sm">
                No tienes clientes registrados.{" "}
                <Link href="/panel/clientes/nuevo" className="text-brand-orange underline">
                  Crea uno primero
                </Link>
                .
              </p>
            ) : (
              <select name="buyerId" required className="panel-select">
                <option value="">— Selecciona un cliente —</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.document ? `· ${c.document}` : ""}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="space-y-1">
            <label className="panel-label">Precio final *</label>
            <input name="finalPrice" type="number" step="0.01" required className="panel-input" />
          </div>

          <div className="space-y-1">
            <label className="panel-label">Forma de pago *</label>
            <select name="paymentMethod" required className="panel-select" defaultValue="EFECTIVO">
              <option value="EFECTIVO">Efectivo</option>
              <option value="TRANSFERENCIA">Transferencia</option>
              <option value="FINANCIADO">Financiado</option>
              <option value="MIXTO">Mixto</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="panel-label">Fecha *</label>
            <input
              name="soldAt"
              type="date"
              required
              defaultValue={today}
              className="panel-input"
            />
          </div>

          <button
            type="submit"
            disabled={clients.length === 0}
            className="panel-btn-primary disabled:opacity-50"
          >
            Registrar venta
          </button>
        </form>
      )}
    </div>
  );
}
