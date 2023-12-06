import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdditiveService } from './additive.service';
import { IngredientDTO } from '../ingredient/ingredient.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('additive')
export class AdditiveController {
  constructor(private readonly additiveService: AdditiveService) {}

  @Post()
  async create(@Body() data: IngredientDTO) {
    return this.additiveService.create(data);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return this.additiveService.findAll();
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.additiveService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string ,@Body() data: IngredientDTO) {
    return this.additiveService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.additiveService.delete(id);
  }
}
