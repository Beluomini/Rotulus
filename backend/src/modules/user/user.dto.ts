import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, isNotEmpty } from "class-validator";

export class UserDTO {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  passwordRec: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  foodsHist?: string[];

  @ApiProperty()
  ingredientAlergies?: string[];

  @ApiProperty()
  additiveAlergies?: string[];
};