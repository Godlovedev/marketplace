import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UploadModule } from './upload/upload.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [AuthModule, UserModule, ConfigModule.forRoot({
  isGlobal: true,
  }), ProductModule, CategoryModule, UploadModule, OrderModule]

})
export class AppModule {}
