import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MotorcycleForm from "@/components/MotorcycleForm";
import FormError from "@/components/panel/FormError";
import DeleteMotorcycleButton from "@/components/panel/DeleteMotorcycleButton";
import {
  updateMotorcycle,
  removePhoto,
  removeSpin,
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

  const motorcycle = await prisma.motorcycle.findUnique({
    where: { id },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  if (!motorcycle) notFound();

  const galleryPhotos = motorcycle.photos.filter((p) => !p.isSpin);
  const spinFrames = motorcycle.photos.filter((p) => p.isSpin);

  return (
    <div className="max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="display text-3xl text-white sm:text-4xl">
          {motorcycle.brand} {motorcycle.model}
        </h1>

        <div className="flex items-center gap-2">
          <form
            action={async (formData: FormData) => {
              "use server";
              await setMotorcycleStatus(
                id,
                formData.get("status") as "DISPONIBLE" | "RESERVADA" | "VENDIDA"
              );
            }}
            className="flex items-center gap-2"
          >
            <select
              name="status"
              defaultValue={motorcycle.status}
              className="panel-select w-auto"
            >
              <option value="DISPONIBLE">Disponible</option>
              <option value="RESERVADA">Reservada</option>
              <option value="VENDIDA">Vendida</option>
            </select>
            <button type="submit" className="panel-btn-secondary">
              Actualizar estado
            </button>
          </form>

          <DeleteMotorcycleButton action={deleteMotorcycle.bind(null, id)} />
        </div>
      </div>

      {spinFrames.length > 0 && (
        <div className="panel-card mt-4 flex flex-wrap items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={spinFrames[0].url}
              alt=""
              className="h-14 w-20 shrink-0 border border-white/10 bg-black/30 object-contain"
            />
            <div>
              <p className="font-condensed text-sm font-bold uppercase tracking-[0.16em] text-white">
                Vista 360 activa
              </p>
              <p className="panel-muted mt-0.5 text-xs">
                {spinFrames.length} cuadros · se muestra antes de las fotos en la ficha
              </p>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await removeSpin(id);
            }}
          >
            <button type="submit" className="panel-btn-danger">
              Quitar giro
            </button>
          </form>
        </div>
      )}

      {galleryPhotos.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden border border-white/10 bg-black/30"
            >
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
                  className="bg-black/70 px-2 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
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
            color: motorcycle.color,
            mileageKm: motorcycle.mileageKm,
            description: motorcycle.description,
          }}
          spinFrameCount={spinFrames.length}
        />
      </div>
    </div>
  );
}
