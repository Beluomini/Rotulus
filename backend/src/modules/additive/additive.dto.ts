import { ApiProperty } from "@nestjs/swagger";

export class AdditiveDTO {
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    description?: string;
};