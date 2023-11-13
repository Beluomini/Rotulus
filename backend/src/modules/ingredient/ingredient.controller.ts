import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDTO } from './ingredient.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  async create(@Body() data: IngredientDTO) {
    return this.ingredientService.create(data);
  }

  @Get()
  async findAll() {
    return this.ingredientService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string ,@Body() data: IngredientDTO) {
    return this.ingredientService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ingredientService.delete(id);
  }
}
