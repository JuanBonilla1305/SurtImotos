import ClientForm from "@/components/ClientForm";
import { createClient } from "@/lib/actions/clients";

export default function NuevoClientePage() {
  return (
    <div>
      <h1 className="panel-heading font-brand text-2xl font-bold uppercase italic">
        Nuevo cliente
      </h1>
      <div className="mt-6">
        <ClientForm action={createClient} />
      </div>
    </div>
  );
}
