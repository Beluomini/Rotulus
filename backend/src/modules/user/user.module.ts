import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService], // Add PrismaService
})
export class UserModule {}
