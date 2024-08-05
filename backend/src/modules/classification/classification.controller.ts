import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { ClassificationDTO } from './classification.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Classification')
@Controller('classification')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Post()
  @ApiResponse({ status: 409, description: 'Classificação já cadastrada' })
  @ApiResponse({ status: 500, description: 'Erro ao criar classificação' })
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
  @ApiResponse({ status: 404, description: 'Classificação não encontrada' })
  async findOne(@Param('id') id: string) {
    return this.classificationService.findOne(id);
  }

  @IsPublic()
  @Get('name/:name')
  async findManyByName(@Param('name') name: string) {
    return this.classificationService.findManyByName(name);
  }

  @Put(':id')
  @ApiResponse({ status: 404, description: 'Classificação não encontrada' })
  @ApiResponse({ status: 409, description: 'Nome para classificação já usado' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar classificação' })
  async update(@Param('id') id: string, @Body() data: ClassificationDTO) {
    return this.classificationService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Classificação não encontrada' })
  @ApiResponse({
    status: 409,
    description:
      'Classificação não pode ser deletada pois possui vinculo com alimento',
  })
  @ApiResponse({ status: 500, description: 'Erro ao deletar classificação' })
  async delete(@Param('id') id: string) {
    return this.classificationService.delete(id);
  }
}
