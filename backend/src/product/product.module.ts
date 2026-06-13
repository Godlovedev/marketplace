import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma.service';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  imports: [UploadModule]
})
export class ProductModule {}
