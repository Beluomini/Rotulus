import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeseaseService } from './desease.service';
import { DeseaseDTO } from './desease.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('desease')
export class DeseaseController {
  constructor(private readonly DeseaseService: DeseaseService) {}

  @Post()
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
  async findOne(@Param('id') id: string) {
    return this.DeseaseService.findOne(id);
  }

  @IsPublic()
  @Get('name/:name')
  async findManyByName(@Param('name') name: string) {
    return this.DeseaseService.findManyByName(name);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: DeseaseDTO) {
    return this.DeseaseService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.DeseaseService.delete(id);
  }

}
