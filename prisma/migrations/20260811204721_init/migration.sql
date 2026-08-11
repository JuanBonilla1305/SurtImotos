-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VENDEDOR');

-- CreateEnum
CREATE TYPE "MotorcycleStatus" AS ENUM ('DISPONIBLE', 'RESERVADA', 'VENDIDA');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('EFECTIVO', 'TRANSFERENCIA', 'FINANCIADO', 'MIXTO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motorcycle" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "displacementCc" INTEGER NOT NULL,
    "plate" TEXT NOT NULL,
    "chassisNumber" TEXT NOT NULL,
    "engineNumber" TEXT,
    "color" TEXT,
    "mileageKm" INTEGER,
    "purchasePrice" DECIMAL(12,2),
    "salePrice" DECIMAL(12,2) NOT NULL,
    "status" "MotorcycleStatus" NOT NULL DEFAULT 'DISPONIBLE',
    "description" TEXT,
    "acquiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "supplierId" TEXT,

    CONSTRAINT "Motorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "motorcycleId" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "motorcycleId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "finalPrice" DECIMAL(12,2) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'EFECTIVO',
    "soldAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_document_key" ON "Client"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_plate_key" ON "Motorcycle"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Motorcycle_chassisNumber_key" ON "Motorcycle"("chassisNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_motorcycleId_key" ON "Sale"("motorcycleId");

-- AddForeignKey
ALTER TABLE "Motorcycle" ADD CONSTRAINT "Motorcycle_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_motorcycleId_fkey" FOREIGN KEY ("motorcycleId") REFERENCES "Motorcycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_motorcycleId_fkey" FOREIGN KEY ("motorcycleId") REFERENCES "Motorcycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
