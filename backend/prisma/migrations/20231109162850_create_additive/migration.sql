/*
  Warnings:

  - You are about to drop the column `characteristics` on the `classifications` table. All the data in the column will be lost.
  - Added the required column `description` to the `classifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classifications" DROP COLUMN "characteristics",
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "additives" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "additives_pkey" PRIMARY KEY ("id")
);
