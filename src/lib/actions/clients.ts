"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ClientSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  document: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  email: z.string().optional(),
});

function parseClientForm(formData: FormData) {
  const raw = {
    name: String(formData.get("name") ?? ""),
    document: String(formData.get("document") ?? "") || undefined,
    phone: String(formData.get("phone") ?? "") || undefined,
    address: String(formData.get("address") ?? "") || undefined,
    email: String(formData.get("email") ?? "") || undefined,
  };
  return ClientSchema.parse(raw);
}

function isUniqueViolation(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"
  );
}

export async function createClient(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const data = parseClientForm(formData);

  try {
    await prisma.client.create({ data });
  } catch (error) {
    if (isUniqueViolation(error)) {
      redirect(
        `/panel/clientes/nuevo?error=${encodeURIComponent("Ya existe otro cliente con esa cédula.")}`
      );
    }
    throw error;
  }

  revalidatePath("/panel/clientes");
  redirect("/panel/clientes");
}

export async function updateClient(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const data = parseClientForm(formData);

  try {
    await prisma.client.update({ where: { id }, data });
  } catch (error) {
    if (isUniqueViolation(error)) {
      redirect(
        `/panel/clientes/${id}?error=${encodeURIComponent("Ya existe otro cliente con esa cédula.")}`
      );
    }
    throw error;
  }

  revalidatePath("/panel/clientes");
  redirect("/panel/clientes");
}

export async function deleteClient(id: string) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  try {
    await prisma.client.delete({ where: { id } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return;
    }
    throw error;
  }

  revalidatePath("/panel/clientes");
}
