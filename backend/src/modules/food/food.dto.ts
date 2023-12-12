export type FoodDTO = {
    id?: string;
    name: string;
    barcode: string;
    brandName: string;
    servingSize: number;
    energyValue: number;
    carbohydrate: number;
    totalSugar: number;
    addedSugar: number;
    protein: number;
    totalFat: number;
    saturatedFat: number;
    transFat: number;
    fiber: number;
    sodium: number;
    description?: string;
    image?: string;
    classificationId: string;
  };