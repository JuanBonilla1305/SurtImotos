-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "isSpin" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Photo_motorcycleId_isSpin_order_idx" ON "Photo"("motorcycleId", "isSpin", "order");
