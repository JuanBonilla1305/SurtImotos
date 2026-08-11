"use server";

import { prisma } from "@/lib/prisma";
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

export async function createClient(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const data = parseClientForm(formData);
  await prisma.client.create({ data });

  revalidatePath("/panel/clientes");
  redirect("/panel/clientes");
}

export async function updateClient(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const data = parseClientForm(formData);
  await prisma.client.update({ where: { id }, data });

  revalidatePath("/panel/clientes");
  redirect("/panel/clientes");
}

export async function deleteClient(id: string) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  await prisma.client.delete({ where: { id } });
  revalidatePath("/panel/clientes");
}
