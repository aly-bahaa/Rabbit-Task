import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order-dto';
import { OrderRepository } from './order.repository';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly prisma: PrismaService,
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
    return this.orderRepository.create(orderData);
  }
}
