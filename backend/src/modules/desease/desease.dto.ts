import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeseaseDTO {
  
    @ApiProperty()
    id?: string;
  
    @ApiProperty()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty()
    description?: string;
};