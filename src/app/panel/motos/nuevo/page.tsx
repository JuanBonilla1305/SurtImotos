import MotorcycleForm from "@/components/MotorcycleForm";
import FormError from "@/components/panel/FormError";
import { createMotorcycle } from "@/lib/actions/motorcycles";
import { prisma } from "@/lib/prisma";

export default async function NuevaMotoPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const suppliers = await prisma.client.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div>
      <h1 className="display text-3xl text-white sm:text-4xl">
        Nueva moto
      </h1>
      <div className="mt-6">
        <FormError message={error} />
        <MotorcycleForm action={createMotorcycle} suppliers={suppliers} />
      </div>
    </div>
  );
}
