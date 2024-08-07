import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FoodDTO {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  barcode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brandName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  servingSize: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  energyValue: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  carbohydrate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalSugar: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  addedSugar: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  protein: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalFat: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  saturatedFat: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  transFat: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  fiber: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sodium: number;

  @ApiProperty()
  listIngredients?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  @IsNotEmpty()
  classificationId: string;

  @ApiProperty()
  ingredients?: string[];

  @ApiProperty()
  additives?: string[];
}
