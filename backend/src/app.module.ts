import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ClassificationModule } from './modules/classification/classification.module';
import { DeseaseModule } from './modules/desease/desease.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { AdditiveModule } from './modules/additive/additive.module';
import { FoodModule } from './modules/food/food.module';
import { AuthModule } from './auth/auth.module';
import { AdmMiddleware } from './middlewares/adm.middleware';
import { AdditiveController } from './modules/additive/additive.controller';
import { IngredientController } from './modules/ingredient/ingredient.controller';
import { DeseaseController } from './modules/desease/desease.controller';
import { FoodController } from './modules/food/food.controller';
import { ClassificationController } from './modules/classification/classification.controller';

@Module({
  imports: [
    UserModule,
    ClassificationModule,
    DeseaseModule,
    IngredientModule,
    AdditiveModule,
    FoodModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdmMiddleware)
      .exclude(
        { path: 'additive', method: RequestMethod.GET },
        { path: 'ingredients', method: RequestMethod.GET },
        { path: 'desease', method: RequestMethod.GET },
        { path: 'food', method: RequestMethod.GET },
        { path: 'classification', method: RequestMethod.GET }
      )
      .forRoutes(
        AdditiveController,
        IngredientController,
        DeseaseController,
        FoodController,
        ClassificationController,
        { path: 'user', method: RequestMethod.DELETE },
        { path: 'user', method: RequestMethod.GET }
      );
  }
}
