/*
  Warnings:

  - You are about to drop the `userHistories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userHistories" DROP CONSTRAINT "userHistories_foodId_fkey";

-- DropForeignKey
ALTER TABLE "userHistories" DROP CONSTRAINT "userHistories_userId_fkey";

-- DropTable
DROP TABLE "userHistories";

-- CreateTable
CREATE TABLE "_FoodToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToUser_AB_unique" ON "_FoodToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToUser_B_index" ON "_FoodToUser"("B");

-- AddForeignKey
ALTER TABLE "_FoodToUser" ADD CONSTRAINT "_FoodToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "foods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToUser" ADD CONSTRAINT "_FoodToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
