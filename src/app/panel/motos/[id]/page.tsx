import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MotorcycleForm from "@/components/MotorcycleForm";
import FormError from "@/components/panel/FormError";
import DeleteMotorcycleButton from "@/components/panel/DeleteMotorcycleButton";
import {
  updateMotorcycle,
  removePhoto,
  setMotorcycleStatus,
  deleteMotorcycle,
} from "@/lib/actions/motorcycles";

export default async function MotoDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const [motorcycle, suppliers] = await Promise.all([
    prisma.motorcycle.findUnique({
      where: { id },
      include: { photos: { orderBy: { order: "asc" } }, sale: true },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  if (!motorcycle) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="display text-3xl text-white sm:text-4xl">
          {motorcycle.brand} {motorcycle.model}
        </h1>

        <div className="flex items-center gap-2">
          {!motorcycle.sale && (
            <form
              action={async (formData: FormData) => {
                "use server";
                await setMotorcycleStatus(
                  id,
                  formData.get("status") as "DISPONIBLE" | "RESERVADA" | "VENDIDA"
                );
              }}
            >
              <select
                name="status"
                defaultValue={motorcycle.status}
                className="panel-select w-auto"
              >
                <option value="DISPONIBLE">Disponible</option>
                <option value="RESERVADA">Reservada</option>
              </select>
              <button type="submit" className="panel-btn-secondary ml-2">
                Actualizar estado
              </button>
            </form>
          )}

          <DeleteMotorcycleButton
            action={deleteMotorcycle.bind(null, id)}
            hasSale={!!motorcycle.sale}
          />
        </div>
      </div>

      {motorcycle.photos.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {motorcycle.photos.map((photo) => (
            <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-md border border-white/10 bg-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt="" className="h-full w-full object-contain" />
              <form
                action={async () => {
                  "use server";
                  await removePhoto(photo.id, id);
                }}
                className="absolute right-1 top-1"
              >
                <button
                  type="submit"
                  className="rounded-full bg-black/70 px-2 py-0.5 text-xs text-white opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <FormError message={error} />
        <MotorcycleForm
          action={updateMotorcycle.bind(null, id)}
          defaultValues={{
            brand: motorcycle.brand,
            model: motorcycle.model,
            year: motorcycle.year,
            displacementCc: motorcycle.displacementCc,
            plate: motorcycle.plate,
            chassisNumber: motorcycle.chassisNumber,
            engineNumber: motorcycle.engineNumber,
            color: motorcycle.color,
            mileageKm: motorcycle.mileageKm,
            purchasePrice: motorcycle.purchasePrice != null ? Number(motorcycle.purchasePrice) : null,
            salePrice: Number(motorcycle.salePrice),
            description: motorcycle.description,
            supplierId: motorcycle.supplierId,
          }}
          suppliers={suppliers}
        />
      </div>
    </div>
  );
}
