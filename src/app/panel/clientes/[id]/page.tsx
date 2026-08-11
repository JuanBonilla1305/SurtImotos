import { notFound } from "next/navigation";
import ClientForm from "@/components/ClientForm";
import { prisma } from "@/lib/prisma";
import { updateClient } from "@/lib/actions/clients";

export default async function EditarClientePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) notFound();

  return (
    <div>
      <h1 className="panel-heading font-brand text-2xl font-bold uppercase italic">
        Editar cliente
      </h1>
      <div className="mt-6">
        <ClientForm
          action={updateClient.bind(null, id)}
          defaultValues={client}
        />
      </div>
    </div>
  );
}
