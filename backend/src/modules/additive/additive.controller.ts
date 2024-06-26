import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdditiveService } from './additive.service';
import { IngredientDTO } from '../ingredient/ingredient.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Additive')
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

  @IsPublic()
  @Get('name/:name')
  async findManyByName(@Param('name') name: string) {
    return this.additiveService.findManyByName(name);
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
