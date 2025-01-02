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

  async countAll(): Promise<number> {
    return this.prisma.product.count();
  }

  async countByFilters(filters: {
    categories?: string[];
    name?: string;
    area?: string;
  }): Promise<number> {
    return this.prisma.product.count({
      where: {
        category: filters.categories ? { in: filters.categories } : undefined,
        name: filters.name ? { contains: filters.name } : undefined,
        area: filters.area ? { contains: filters.area } : undefined,
      },
    });
  }
  async findMostOrdered(area: string): Promise<any[]> {
    return await this.prisma.$queryRaw`
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      p.category AS product_category,
      p.area AS product_area,
      SUM(oi.quantity) AS total_quantity_ordered
    FROM 
      Product p
    JOIN 
      OrderItem oi ON p.id = oi.productId
    WHERE 
      p.area = ${area}
    GROUP BY 
      p.id, p.name, p.category, p.area
    ORDER BY 
      total_quantity_ordered DESC
    LIMIT 10;
  `;
  }
}
