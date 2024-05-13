import { ApiProperty } from "@nestjs/swagger";

export class DeseaseDTO {
  
    @ApiProperty()
    id?: string;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    description?: string;
};