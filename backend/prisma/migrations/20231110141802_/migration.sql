/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `additives` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `classifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `deseases` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ingredients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `additives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "additives" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "additives_name_key" ON "additives"("name");

-- CreateIndex
CREATE UNIQUE INDEX "classifications_name_key" ON "classifications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "deseases_name_key" ON "deseases"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ingredients_name_key" ON "ingredients"("name");
