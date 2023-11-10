/*
  Warnings:

  - You are about to drop the column `description` on the `classifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "classifications" DROP COLUMN "description",
ADD COLUMN     "caracteristic" TEXT;

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "energyValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "carbohydrate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalSugar" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "addedSugar" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "protein" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalFat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "saturatedFat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "transFat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" TEXT,
    "classificationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES "classifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
