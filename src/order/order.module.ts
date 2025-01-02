import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationService } from './notification.service';

@Module({
  controllers: [OrderController],
  providers: [
    PrismaService,
    NotificationService,
    OrderService,
    OrderRepository,
  ],
})
export class OrderModule {}
