import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
//import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    private readonly productsRepository: ProductRepository,
    // private prismaService: PrismaService,
  ) {}

  async getAllProducts(filters: GetAllProductsDTO): Promise<ProductDTO[]> {
    const { categories, name, area, page = 1 } = filters;
    const limit = filters.limit ? Number(filters.limit) : 10;
    console.log('limit', limit);
    const skip = (page - 1) * limit;
    console.log('skip', skip);
    try {
      if (categories || name || area) {
        return this.productsRepository.findByFilters(
          { categories, name, area },
          skip,
          limit,
        );
      }
      return this.productsRepository.findAll(skip, limit);
    } catch (error) {
      throw new Error('Failed to fetch products: ' + error.message);
    }
  }

  async getProductById(id: number): Promise<ProductDTO> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
