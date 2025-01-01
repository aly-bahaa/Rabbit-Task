import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(skip: number, take: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      skip,
      take,
    });
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    category: string;
    area: string;
  }): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findByFilters(
    filters: {
      categories?: string[];
      name?: string;
      area?: string;
    },
    skip: number,
    take: number,
  ): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        category: filters.categories ? { in: filters.categories } : undefined,
        name: filters.name ? { contains: filters.name } : undefined,
        area: filters.area ? { contains: filters.area } : undefined,
      },
      skip,
      take,
    });
  }
}
