import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const DEMO_PHOTO = "/brand/logo-transparent.png";

const MOTOS = [
  { brand: "Yamaha", model: "MT-03", year: 2022, displacementCc: 321, plate: "ABC12D", chassisNumber: "CH-MT03-0001", color: "Azul", mileageKm: 12400, purchasePrice: 15800000, salePrice: 18500000, description: "Único dueño, mantenimientos en concesionario y llantas nuevas." },
  { brand: "Bajaj", model: "Pulsar NS200", year: 2021, displacementCc: 199, plate: "BCD23E", chassisNumber: "CH-NS200-0002", color: "Rojo", mileageKm: 23800, purchasePrice: 8200000, salePrice: 9800000, description: "Escape original, kit de arrastre recién cambiado." },
  { brand: "Honda", model: "CB190R", year: 2020, displacementCc: 184, plate: "CDE34F", chassisNumber: "CH-CB190-0003", color: "Negro", mileageKm: 31200, purchasePrice: 6500000, salePrice: 7900000, description: "Papeles al día, lista para traspaso inmediato." },
  { brand: "Suzuki", model: "Gixxer 250", year: 2023, displacementCc: 249, plate: "DEF45G", chassisNumber: "CH-GIX250-0004", color: "Gris", mileageKm: 4100, purchasePrice: 12000000, salePrice: 14200000, description: "Prácticamente nueva, aún con garantía de fábrica." },
  { brand: "Yamaha", model: "FZ 2.0", year: 2019, displacementCc: 149, plate: "EFG56H", chassisNumber: "CH-FZ20-0005", color: "Blanco", mileageKm: 42000, purchasePrice: 5200000, salePrice: 6400000, description: "Ideal para ciudad, bajo consumo y muy económica." },
  { brand: "AKT", model: "NKD 125", year: 2021, displacementCc: 125, plate: "FGH67J", chassisNumber: "CH-NKD125-0006", color: "Naranja", mileageKm: 18900, purchasePrice: 3400000, salePrice: 4300000, description: "Perfecta para trabajo diario, mecánica sencilla." },
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const proveedor = await prisma.client.upsert({
    where: { document: "1110123456" },
    update: {},
    create: { name: "Carlos Ramírez", document: "1110123456", phone: "3115550101", address: "Cra 5 #21-14, Ibagué" },
  });

  const comprador = await prisma.client.upsert({
    where: { document: "1110987654" },
    update: {},
    create: { name: "Laura Peña", document: "1110987654", phone: "3115550202", email: "laura.pena@example.com" },
  });

  for (const moto of MOTOS) {
    await prisma.motorcycle.upsert({
      where: { plate: moto.plate },
      update: {},
      create: {
        ...moto,
        supplierId: proveedor.id,
        photos: { create: [{ url: DEMO_PHOTO, order: 0 }] },
      },
    });
  }

  const vendida = await prisma.motorcycle.upsert({
    where: { plate: "GHI78K" },
    update: {},
    create: {
      brand: "Honda", model: "XR 150L", year: 2020, displacementCc: 149,
      plate: "GHI78K", chassisNumber: "CH-XR150-0007", color: "Rojo", mileageKm: 27500,
      purchasePrice: 6100000, salePrice: 7500000, status: "VENDIDA",
      photos: { create: [{ url: DEMO_PHOTO, order: 0 }] },
    },
  });

  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (admin) {
    const yaVendida = await prisma.sale.findUnique({ where: { motorcycleId: vendida.id } });
    if (!yaVendida) {
      await prisma.sale.create({
        data: {
          motorcycleId: vendida.id,
          buyerId: comprador.id,
          sellerId: admin.id,
          finalPrice: 7300000,
          paymentMethod: "TRANSFERENCIA",
        },
      });
    }
  } else {
    console.warn("No hay usuario ADMIN: ejecuta primero `npm run seed:admin` para crear la venta de ejemplo.");
  }

  console.log(`Datos de ejemplo listos: ${MOTOS.length} motos disponibles, 1 vendida, 2 clientes.`);
  await prisma.$disconnect();
}

main();
