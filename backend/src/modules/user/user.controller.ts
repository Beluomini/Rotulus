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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  @ApiResponse({ status: 409, description: 'Este email já está sendo usado' })
  @ApiResponse({ status: 500, description: 'Erro ao criar usuário' })
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('email/:email')
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Put(':id')
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 409, description: 'Este email já está sendo usado' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar usuário' })
  async update(
    @Param('id') id: string,
    @Body() data: UserDTO,
    @CurrentUser() user: UserDTO
  ) {
    return this.userService.update(id, data, user);
  }

  @Put('hist/:id')
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 409, description: 'Este email já está sendo usado' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar histórico' })
  async updateHist(
    @Param('id') id: string,
    @Body() data: UserDTO,
    @CurrentUser() user: UserDTO
  ) {
    return this.userService.updateHist(id, data, user);
  }

  @Put('alergies/:id')
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 409, description: 'Este email já está sendo usado' })
  @ApiResponse({ status: 500, description: 'Erro ao atualizar alergias' })
  async updateAlergies(
    @Param('id') id: string,
    @Body() data: UserDTO,
    @CurrentUser() user: UserDTO
  ) {
    return this.userService.updateAlergies(id, data, user);
  }

  @Delete(':id')
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro ao deletar usuário' })
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
