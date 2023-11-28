import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodDTO } from './food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async create(@Body() data: FoodDTO) {
    return this.foodService.create(data);
  }

  @Get()
  async findAll() {
    return this.foodService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @Get('barcode/:barcode')
  async findByBarcode(@Param('barcode') barcode: string) {
    return this.foodService.findByBarcode(barcode);
  }

  @Put(':id')
  async update(@Param('id') id: string ,@Body() data: FoodDTO) {
    return this.foodService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.foodService.delete(id);
  }
  
}
