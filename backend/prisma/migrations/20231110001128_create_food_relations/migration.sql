-- CreateTable
CREATE TABLE "ingredientsOnFoods" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredientsOnFoods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additivesOnFoods" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "additiveId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "additivesOnFoods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ingredientsOnFoods" ADD CONSTRAINT "ingredientsOnFoods_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ingredientsOnFoods" ADD CONSTRAINT "ingredientsOnFoods_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additivesOnFoods" ADD CONSTRAINT "additivesOnFoods_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "additivesOnFoods" ADD CONSTRAINT "additivesOnFoods_additiveId_fkey" FOREIGN KEY ("additiveId") REFERENCES "additives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
