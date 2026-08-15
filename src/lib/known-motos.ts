import { prisma } from "@/lib/prisma";
import type { KnownPair } from "@/lib/moto-catalog";

/**
 * Marcas y líneas ya registradas en el inventario, para sumarlas a las
 * sugerencias del formulario. Así el banco crece con el uso real del negocio
 * en vez de depender de una lista fija.
 */
export async function getKnownMotoPairs(): Promise<KnownPair[]> {
  return prisma.motorcycle.findMany({
    select: { brand: true, model: true },
    distinct: ["brand", "model"],
    orderBy: [{ brand: "asc" }, { model: "asc" }],
  });
}
