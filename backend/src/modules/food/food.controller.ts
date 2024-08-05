import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDTO } from './food.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Food')
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  @ApiResponse({
    status: 409,
    description: 'Este código de barras já está sendo usado',
  })
  @ApiResponse({ status: 500, description: 'Erro ao criar alimento' })
  async create(@Body() data: FoodDTO) {
    return this.foodService.create(data);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return this.foodService.findAll();
  }

  @IsPublic()
  @Get(':id')
  @ApiResponse({ status: 404, description: 'Alimento não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @IsPublic()
  @Get('barcode/:barcode')
  @ApiResponse({ status: 404, description: 'Alimento não encontrado' })
  async findByBarcode(@Param('barcode') barcode: string) {
    return this.foodService.findByBarcode(barcode);
  }

  @IsPublic()
  @Get('name/:name')
  async findManyByName(@Param('name') name: string) {
    return this.foodService.findManyByName(name);
  }

  @Put(':id')
  @ApiResponse({ status: 404, description: 'Alimento não encontrado' })
  @ApiResponse({
    status: 409,
    description: 'Este código de barras já está sendo usado',
  })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar alimento' })
  async update(@Param('id') id: string, @Body() data: FoodDTO) {
    return this.foodService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Alimento não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro ao deletar alimento' })
  async delete(@Param('id') id: string) {
    return this.foodService.delete(id);
  }
}
