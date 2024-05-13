import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
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