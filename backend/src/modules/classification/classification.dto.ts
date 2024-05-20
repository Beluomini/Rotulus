import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ClassificationDTO {
  
  @ApiProperty()
  id?: string;
  
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  description?: string;
};

