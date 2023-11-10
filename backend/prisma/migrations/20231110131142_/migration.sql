/*
  Warnings:

  - A unique constraint covering the columns `[barcode]` on the table `foods` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barcode` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "barcode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "userAdditiveAlergies" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "additiveId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userAdditiveAlergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userIngredientAlergies" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userIngredientAlergies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "foods_barcode_key" ON "foods"("barcode");

-- AddForeignKey
ALTER TABLE "userAdditiveAlergies" ADD CONSTRAINT "userAdditiveAlergies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAdditiveAlergies" ADD CONSTRAINT "userAdditiveAlergies_additiveId_fkey" FOREIGN KEY ("additiveId") REFERENCES "additives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userIngredientAlergies" ADD CONSTRAINT "userIngredientAlergies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userIngredientAlergies" ADD CONSTRAINT "userIngredientAlergies_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
