import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { MailService } from 'src/mail.service';

@Module({
  providers: [OrderService, PrismaService, MailService],
  controllers: [OrderController]
})
export class OrderModule {}
