import { ApiProperty } from "@nestjs/swagger";

export class ClassificationDTO {
  
  @ApiProperty()
  id?: string;
  
  @ApiProperty()
  name: string;
  
  @ApiProperty()
  description?: string;
};

