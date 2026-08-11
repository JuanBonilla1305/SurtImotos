"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const SaleSchema = z.object({
  motorcycleId: z.string().min(1, "Selecciona una moto"),
  buyerId: z.string().min(1, "Selecciona un cliente comprador"),
  finalPrice: z.coerce.number().min(0),
  paymentMethod: z.enum(["EFECTIVO", "TRANSFERENCIA", "FINANCIADO", "MIXTO"]),
  soldAt: z.string().min(1),
});

export async function createSale(formData: FormData) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const data = SaleSchema.parse({
    motorcycleId: formData.get("motorcycleId"),
    buyerId: formData.get("buyerId"),
    finalPrice: formData.get("finalPrice"),
    paymentMethod: formData.get("paymentMethod"),
    soldAt: formData.get("soldAt"),
  });

  await prisma.$transaction(async (tx) => {
    const motorcycle = await tx.motorcycle.findUnique({
      where: { id: data.motorcycleId },
    });
    if (!motorcycle || motorcycle.status === "VENDIDA") {
      throw new Error("Esta moto ya no está disponible para la venta.");
    }

    await tx.sale.create({
      data: {
        motorcycleId: data.motorcycleId,
        buyerId: data.buyerId,
        sellerId: session.user!.id as string,
        finalPrice: data.finalPrice,
        paymentMethod: data.paymentMethod,
        soldAt: new Date(data.soldAt),
      },
    });

    await tx.motorcycle.update({
      where: { id: data.motorcycleId },
      data: { status: "VENDIDA" },
    });
  });

  revalidatePath("/panel/ventas");
  revalidatePath("/panel/motos");
  redirect("/panel/ventas");
}
