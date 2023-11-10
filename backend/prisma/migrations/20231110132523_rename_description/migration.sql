/*
  Warnings:

  - You are about to drop the column `caracteristic` on the `classifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "classifications" DROP COLUMN "caracteristic",
ADD COLUMN     "description" TEXT;
