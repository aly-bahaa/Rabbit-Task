import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    customerId: number;
    items: { productId: number; quantity: number }[];
  }) {
    const order = await this.prisma.order.create({
      data: {
        customerId: data.customerId,
      },
    });

    const orderItems = await Promise.all(
      data.items.map((item) =>
        this.prisma.orderItem.create({
          data: {
            productId: item.productId,
            quantity: item.quantity,
            orderId: order.id,
          },
        }),
      ),
    );

    return {
      ...order,
      items: orderItems,
    };
  }
}
