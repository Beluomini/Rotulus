import { ApiProperty } from "@nestjs/swagger";

export class FoodDTO {

    @ApiProperty()
    id?: string;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    barcode: string;
  
    @ApiProperty()
    brandName: string;
  
    @ApiProperty()
    servingSize: number;
  
    @ApiProperty()
    energyValue: number;
  
    @ApiProperty()
    carbohydrate: number;
  
    @ApiProperty()
    totalSugar: number;
  
    @ApiProperty()
    addedSugar: number;
  
    @ApiProperty()
    protein: number;
  
    @ApiProperty()
    totalFat: number;
  
    @ApiProperty()
    saturatedFat: number;
  
    @ApiProperty()
    transFat: number;
  
    @ApiProperty()
    fiber: number;
  
    @ApiProperty()
    sodium: number;
  
    @ApiProperty()
    listIngredients?: string;
  
    @ApiProperty()
    description?: string;
  
    @ApiProperty()
    image?: string;
  
    @ApiProperty()
    classificationId: string;
  
    @ApiProperty()
    ingredients?: string[];
  
    @ApiProperty()
    additives?: string[];
  };