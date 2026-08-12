import ClientForm from "@/components/ClientForm";
import FormError from "@/components/panel/FormError";
import { createClient } from "@/lib/actions/clients";

export default async function NuevoClientePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <h1 className="panel-heading font-brand text-2xl font-bold uppercase italic">
        Nuevo cliente
      </h1>
      <div className="mt-6">
        <FormError message={error} />
        <ClientForm action={createClient} />
      </div>
    </div>
  );
}
