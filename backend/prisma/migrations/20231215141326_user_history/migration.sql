/*
  Warnings:

  - You are about to drop the `_FoodToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FoodToUser" DROP CONSTRAINT "_FoodToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToUser" DROP CONSTRAINT "_FoodToUser_B_fkey";

-- DropTable
DROP TABLE "_FoodToUser";

-- CreateTable
CREATE TABLE "usersFoodsHist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usersFoodsHist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usersFoodsHist" ADD CONSTRAINT "usersFoodsHist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersFoodsHist" ADD CONSTRAINT "usersFoodsHist_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
