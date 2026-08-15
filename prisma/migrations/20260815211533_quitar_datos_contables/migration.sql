/*
  Warnings:

  - You are about to drop the column `acquiredAt` on the `Motorcycle` table. All the data in the column will be lost.
  - You are about to drop the column `purchasePrice` on the `Motorcycle` table. All the data in the column will be lost.
  - You are about to drop the column `salePrice` on the `Motorcycle` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `Motorcycle` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Motorcycle" DROP CONSTRAINT "Motorcycle_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_motorcycleId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_sellerId_fkey";

-- AlterTable
ALTER TABLE "Motorcycle" DROP COLUMN "acquiredAt",
DROP COLUMN "purchasePrice",
DROP COLUMN "salePrice",
DROP COLUMN "supplierId";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Sale";

-- DropEnum
DROP TYPE "PaymentMethod";
