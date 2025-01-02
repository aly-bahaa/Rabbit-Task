import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order-dto';
import { OrderRepository } from './order.repository';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from './notification.service';
@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}
  async create(orderData: CreateOrderDTO) {
    if (!orderData.items || orderData.items.length === 0) {
      throw new BadRequestException(`Order must have at least one item`);
    }
    const productIds = orderData.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException(`One or more products not found`);
    }

    try {
      const message = `New order created with from customer ${orderData.customerId}`;
      await this.notificationService.sendNotification(message);
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
    return this.orderRepository.create(orderData);
  }
}
