/*
  Warnings:

  - You are about to drop the column `chassisNumber` on the `Motorcycle` table. All the data in the column will be lost.
  - You are about to drop the column `engineNumber` on the `Motorcycle` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Motorcycle_chassisNumber_key";

-- AlterTable
ALTER TABLE "Motorcycle" DROP COLUMN "chassisNumber",
DROP COLUMN "engineNumber";
