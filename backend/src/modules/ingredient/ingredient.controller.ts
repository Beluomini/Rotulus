import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDTO } from './ingredient.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  async create(@Body() data: IngredientDTO) {
    return this.ingredientService.create(data);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return this.ingredientService.findAll();
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  @IsPublic()
  @Get('name/:name')
  async findManyByName(@Param('name') name: string) {
    return this.ingredientService.findManyByName(name);
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
