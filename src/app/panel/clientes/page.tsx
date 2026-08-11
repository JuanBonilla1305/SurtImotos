import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteClient } from "@/lib/actions/clients";

export default async function ClientesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const clients = await prisma.client.findMany({
    where: q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { document: { contains: q, mode: "insensitive" } },
            { phone: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="panel-heading font-brand text-2xl font-bold uppercase italic">
          Clientes
        </h1>
        <Link href="/panel/clientes/nuevo" className="panel-btn-primary">
          + Nuevo cliente
        </Link>
      </div>

      <form className="mt-4">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Buscar por nombre, cédula o teléfono..."
          className="panel-input max-w-sm"
        />
      </form>

      <div className="panel-table-wrap mt-6">
        <table className="panel-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="text-white">{client.name}</td>
                <td className="panel-muted">{client.document ?? "—"}</td>
                <td className="panel-muted">{client.phone ?? "—"}</td>
                <td className="panel-muted">{client.email ?? "—"}</td>
                <td className="text-right">
                  <Link
                    href={`/panel/clientes/${client.id}`}
                    className="text-brand-chrome hover:text-brand-orange"
                  >
                    Editar
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteClient(client.id);
                    }}
                    className="inline"
                  >
                    <button type="submit" className="ml-3 text-red-400 hover:text-red-300">
                      Eliminar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="panel-muted py-8 text-center">
                  No hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
