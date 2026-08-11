import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

async function main() {
  const name = process.argv[2];
  const email = process.argv[3];
  const password = process.argv[4];

  if (!name || !email || !password) {
    console.error("Uso: tsx scripts/seed-admin.ts <nombre> <correo> <contraseña>");
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, name, passwordHash, role: "ADMIN" },
  });

  console.log(`Usuario admin listo: ${user.email}`);
  await prisma.$disconnect();
}

main();
