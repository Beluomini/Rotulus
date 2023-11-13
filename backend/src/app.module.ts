import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ClassificationModule } from './modules/classification/classification.module';
import { DeseaseModule } from './modules/desease/desease.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { AdditiveModule } from './modules/additive/additive.module';

@Module({
  imports: [UserModule, ClassificationModule, DeseaseModule, IngredientModule, AdditiveModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
