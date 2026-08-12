"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { deleteMotorcyclePhoto } from "@/lib/supabase/photos";

const FIELD_LABEL: Record<string, string> = {
  plate: "la placa",
  chassisNumber: "el chasis",
  engineNumber: "el número de motor",
};

function duplicateFieldMessage(error: unknown): string | null {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    const rawTarget = error.meta?.target;
    const targetFields = Array.isArray(rawTarget) ? rawTarget : [String(rawTarget ?? "")];

    const matched = Object.keys(FIELD_LABEL).filter((key) =>
      targetFields.some((t) => String(t).toLowerCase().includes(key.toLowerCase()))
    );
    const fields = matched.map((f) => FIELD_LABEL[f]).join(" y ");
    return `Ya existe otra moto registrada con ${fields || "esos mismos datos"}.`;
  }
  return null;
}

const MotorcycleSchema = z.object({
  brand: z.string().min(1, "La marca es obligatoria"),
  model: z.string().min(1, "El modelo/línea es obligatorio"),
  year: z.coerce.number().int().min(1980).max(2100),
  displacementCc: z.coerce.number().int().min(0),
  plate: z.string().min(1, "La placa es obligatoria"),
  chassisNumber: z.string().min(1, "El chasis es obligatorio"),
  engineNumber: z.string().optional(),
  color: z.string().optional(),
  mileageKm: z.coerce.number().int().min(0).optional(),
  purchasePrice: z.coerce.number().min(0).optional(),
  salePrice: z.coerce.number().min(0),
  description: z.string().optional(),
  supplierId: z.string().optional(),
});

function parseMotorcycleForm(formData: FormData) {
  const raw = {
    brand: String(formData.get("brand") ?? ""),
    model: String(formData.get("model") ?? ""),
    year: String(formData.get("year") ?? ""),
    displacementCc: String(formData.get("displacementCc") ?? ""),
    plate: String(formData.get("plate") ?? "").toUpperCase().trim(),
    chassisNumber: String(formData.get("chassisNumber") ?? "").toUpperCase().trim(),
    engineNumber: String(formData.get("engineNumber") ?? "") || undefined,
    color: String(formData.get("color") ?? "") || undefined,
    mileageKm: String(formData.get("mileageKm") ?? "") || undefined,
    purchasePrice: String(formData.get("purchasePrice") ?? "") || undefined,
    salePrice: String(formData.get("salePrice") ?? ""),
    description: String(formData.get("description") ?? "") || undefined,
    supplierId: String(formData.get("supplierId") ?? "") || undefined,
  };
  return MotorcycleSchema.parse(raw);
}

async function requireSession() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session;
}

export async function createMotorcycle(formData: FormData) {
  await requireSession();
  const data = parseMotorcycleForm(formData);

  let motorcycle;
  try {
    motorcycle = await prisma.motorcycle.create({ data });
  } catch (error) {
    const message = duplicateFieldMessage(error);
    if (message) redirect(`/panel/motos/nuevo?error=${encodeURIComponent(message)}`);
    throw error;
  }

  const photoUrls = formData.getAll("photoUrls").map(String).filter(Boolean);
  await savePhotoUrls(motorcycle.id, photoUrls);

  revalidatePath("/panel/motos");
  redirect(`/panel/motos/${motorcycle.id}`);
}

export async function updateMotorcycle(id: string, formData: FormData) {
  await requireSession();
  const data = parseMotorcycleForm(formData);

  try {
    await prisma.motorcycle.update({ where: { id }, data });
  } catch (error) {
    const message = duplicateFieldMessage(error);
    if (message) redirect(`/panel/motos/${id}?error=${encodeURIComponent(message)}`);
    throw error;
  }

  const photoUrls = formData.getAll("photoUrls").map(String).filter(Boolean);
  await savePhotoUrls(id, photoUrls);

  revalidatePath("/panel/motos");
  revalidatePath(`/panel/motos/${id}`);
  redirect(`/panel/motos/${id}`);
}

async function savePhotoUrls(motorcycleId: string, urls: string[]) {
  if (urls.length === 0) return;

  const existingCount = await prisma.photo.count({ where: { motorcycleId } });

  await prisma.photo.createMany({
    data: urls.map((url, index) => ({
      motorcycleId,
      url,
      order: existingCount + index,
    })),
  });
}

export async function removePhoto(photoId: string, motorcycleId: string) {
  await requireSession();
  const photo = await prisma.photo.findUnique({ where: { id: photoId } });
  if (!photo) return;

  await prisma.photo.delete({ where: { id: photoId } });
  await deleteMotorcyclePhoto(photo.url);

  revalidatePath(`/panel/motos/${motorcycleId}`);
}

export async function setMotorcycleStatus(
  id: string,
  status: "DISPONIBLE" | "RESERVADA" | "VENDIDA"
) {
  await requireSession();
  await prisma.motorcycle.update({ where: { id }, data: { status } });
  revalidatePath("/panel/motos");
  revalidatePath(`/panel/motos/${id}`);
}

export async function deleteMotorcycle(id: string) {
  await requireSession();
  const photos = await prisma.photo.findMany({ where: { motorcycleId: id } });

  await prisma.$transaction([
    prisma.sale.deleteMany({ where: { motorcycleId: id } }),
    prisma.motorcycle.delete({ where: { id } }),
  ]);

  await Promise.all(photos.map((p) => deleteMotorcyclePhoto(p.url)));

  revalidatePath("/panel/motos");
  revalidatePath("/panel/ventas");
  revalidatePath("/panel");
}
