/**
 * Normaliza marca y línea de las motos ya guardadas.
 * Útil tras cargar datos a mano: "Yamaha " y "Yamaha" aparecían como dos marcas
 * distintas en el filtro del catálogo.
 */
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { canonicalBrand, cleanText } from "../src/lib/moto-catalog";
import "dotenv/config";

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  const motos = await prisma.motorcycle.findMany({
    select: { id: true, brand: true, model: true },
  });

  let corregidas = 0;

  for (const moto of motos) {
    const brand = canonicalBrand(moto.brand);
    const model = cleanText(moto.model);

    if (brand === moto.brand && model === moto.model) continue;

    await prisma.motorcycle.update({ where: { id: moto.id }, data: { brand, model } });
    console.log(`«${moto.brand}» / «${moto.model}»  →  «${brand}» / «${model}»`);
    corregidas++;
  }

  console.log(`${corregidas} de ${motos.length} motos corregidas.`);
  await prisma.$disconnect();
}

main();
