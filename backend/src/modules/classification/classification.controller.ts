import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { ClassificationDTO } from './classification.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Classification')
@Controller('classification')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Post()
  async create(@Body() data: ClassificationDTO) {
    return this.classificationService.create(data);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return this.classificationService.findAll();
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.classificationService.findOne(id);
  }

  @IsPublic()
  @Get('name/:name')
  async findManyByName(@Param('name') name: string) {
    return this.classificationService.findManyByName(name);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ClassificationDTO) {
    return this.classificationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.classificationService.delete(id);
  }
}
