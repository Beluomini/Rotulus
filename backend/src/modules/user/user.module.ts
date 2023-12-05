import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../database/PrismaService';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  exports: [UserService],
})
export class UserModule {}
