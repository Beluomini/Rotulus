import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ClassificationModule } from './modules/classification/classification.module';
import { DeseaseModule } from './modules/desease/desease.module';

@Module({
  imports: [UserModule, ClassificationModule, DeseaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
