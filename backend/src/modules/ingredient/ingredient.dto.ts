import { ApiProperty } from "@nestjs/swagger";

export class IngredientDTO {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    description?: string;
};