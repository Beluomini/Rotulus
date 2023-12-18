/*
  Warnings:

  - You are about to drop the `usersFoodsHist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "usersFoodsHist" DROP CONSTRAINT "usersFoodsHist_foodId_fkey";

-- DropForeignKey
ALTER TABLE "usersFoodsHist" DROP CONSTRAINT "usersFoodsHist_userId_fkey";

-- DropTable
DROP TABLE "usersFoodsHist";

-- CreateTable
CREATE TABLE "FoodToUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodToUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoodToUser" ADD CONSTRAINT "FoodToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodToUser" ADD CONSTRAINT "FoodToUser_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
