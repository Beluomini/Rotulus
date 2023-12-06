import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { ClassificationDTO } from './classification.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

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

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ClassificationDTO) {
    return this.classificationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.classificationService.delete(id);
  }
}
