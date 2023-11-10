import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { FoodModule } from './modules/food/food.module';
import { ClassificationModule } from './modules/classification/classification.module';

@Module({
  imports: [UserModule, FoodModule, ClassificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
