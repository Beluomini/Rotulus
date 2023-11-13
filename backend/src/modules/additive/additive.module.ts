import { Module } from '@nestjs/common';
import { AdditiveService } from './additive.service';
import { AdditiveController } from './additive.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [AdditiveController],
  providers: [AdditiveService, PrismaService],
})
export class AdditiveModule {}
