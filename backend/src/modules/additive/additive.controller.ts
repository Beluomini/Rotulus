import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdditiveService } from './additive.service';
import { IngredientDTO } from '../ingredient/ingredient.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Additive')
@Controller('additive')
export class AdditiveController {
  constructor(private readonly additiveService: AdditiveService) {}

  @Post()
  @ApiResponse({ status: 409, description: 'Aditivo já cadastrado' })
  @ApiResponse({ status: 500, description: 'Erro ao criar aditivo' })
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
  @ApiResponse({ status: 404, description: 'Aditivo não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.additiveService.findOne(id);
  }

  @IsPublic()
  @Get('name/:name')
  async findManyByName(@Param('name') name: string) {
    return this.additiveService.findManyByName(name);
  }

  @Put(':id')
  @ApiResponse({ status: 404, description: 'Aditivo não encontrado' })
  @ApiResponse({ status: 409, description: 'Nome para aditivo já usado' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar aditivo' })
  async update(@Param('id') id: string, @Body() data: IngredientDTO) {
    return this.additiveService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Aditivo não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro ao deletar aditivo' })
  async delete(@Param('id') id: string) {
    return this.additiveService.delete(id);
  }
}
