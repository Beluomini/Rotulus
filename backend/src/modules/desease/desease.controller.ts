import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeseaseService } from './desease.service';
import { DeseaseDTO } from './desease.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Desease')
@Controller('desease')
export class DeseaseController {
  constructor(private readonly DeseaseService: DeseaseService) {}

  @Post()
  @ApiResponse({ status: 409, description: 'Doença já cadastrada' })
  @ApiResponse({ status: 500, description: 'Erro ao criar doença' })
  async create(@Body() data: DeseaseDTO) {
    return this.DeseaseService.create(data);
  }

  @IsPublic()
  @Get()
  async findAll() {
    return this.DeseaseService.findAll();
  }

  @IsPublic()
  @Get(':id')
  @ApiResponse({ status: 404, description: 'Doença não encontrada' })
  async findOne(@Param('id') id: string) {
    return this.DeseaseService.findOne(id);
  }

  @IsPublic()
  @Get('name/:name')
  async findManyByName(@Param('name') name: string) {
    return this.DeseaseService.findManyByName(name);
  }

  @Put(':id')
  @ApiResponse({ status: 404, description: 'Doença não encontrada' })
  @ApiResponse({ status: 409, description: 'Nome para doença já usado' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar doença' })
  async update(@Param('id') id: string, @Body() data: DeseaseDTO) {
    return this.DeseaseService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Doença não encontrada' })
  @ApiResponse({ status: 500, description: 'Erro ao deletar doença' })
  async delete(@Param('id') id: string) {
    return this.DeseaseService.delete(id);
  }
}
