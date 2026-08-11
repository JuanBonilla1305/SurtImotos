import MotorcycleForm from "@/components/MotorcycleForm";
import { createMotorcycle } from "@/lib/actions/motorcycles";
import { prisma } from "@/lib/prisma";

export default async function NuevaMotoPage() {
  const suppliers = await prisma.client.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div>
      <h1 className="panel-heading font-brand text-2xl font-bold uppercase italic">
        Nueva moto
      </h1>
      <div className="mt-6">
        <MotorcycleForm action={createMotorcycle} suppliers={suppliers} />
      </div>
    </div>
  );
}
