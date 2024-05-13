import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async findAll(@CurrentUser() user: UserDTO) {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UserDTO) {
    return this.userService.update(id, data);
  }

  @Put('hist/:id')
  async updateHist(@Param('id') id: string, @Body() data: UserDTO) {
    return this.userService.updateHist(id, data);
  }

  @Put('alergies/:id')
  async updateAlergies(@Param('id') id: string, @Body() data: UserDTO) {
    return this.userService.updateAlergies(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
