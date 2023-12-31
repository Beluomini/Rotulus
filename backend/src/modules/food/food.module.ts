import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [FoodController],
  providers: [FoodService, PrismaService],
})
export class FoodModule {}
