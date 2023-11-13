import { Module } from '@nestjs/common';
import { DeseaseService } from './desease.service';
import { DeseaseController } from './desease.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [DeseaseController],
  providers: [DeseaseService, PrismaService],
})
export class DeseaseModule {}
