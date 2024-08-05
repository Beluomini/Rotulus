import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDTO } from './ingredient.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Ingredient')
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @ApiResponse({
    status: 409,
    description: 'Ingrediente com esse nome já criado',
  })
  @ApiResponse({ status: 500, description: 'Erro ao criar ingrediente' })
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
  @ApiResponse({ status: 404, description: 'Ingrediente não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(id);
  }

  @IsPublic()
  @Get('name/:name')
  async findManyByName(@Param('name') name: string) {
    return this.ingredientService.findManyByName(name);
  }

  @Put(':id')
  @ApiResponse({ status: 404, description: 'Ingrediente não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar ingrediente' })
  async update(@Param('id') id: string, @Body() data: IngredientDTO) {
    return this.ingredientService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Ingrediente não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro ao deletar ingrediente' })
  async delete(@Param('id') id: string) {
    return this.ingredientService.delete(id);
  }
}
