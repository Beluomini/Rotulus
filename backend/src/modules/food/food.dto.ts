export type FoodDTO = {
    id?: string;
    name: string;
    barcode: string;
    brandName: string;
    energyValue: number;
    carbohydrate: number;
    totalSugar: number;
    addedSugar: number;
    protein: number;
    totalFat: number;
    saturatedFat: number;
    transFat: number;
    description?: string;
    classificationId: string;
  };