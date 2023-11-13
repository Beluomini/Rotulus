import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeseaseService } from './desease.service';
import { DeseaseDTO } from './desease.dto';

@Controller('desease')
export class DeseaseController {
  constructor(private readonly DeseaseService: DeseaseService) {}

  @Post()
  async create(@Body() data: DeseaseDTO) {
    return this.DeseaseService.create(data);
  }

  @Get()
  async findAll() {
    return this.DeseaseService.findAll();
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
