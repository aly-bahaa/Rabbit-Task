import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
//import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';
import { GetProductsResponseDTO } from './dto/get-products-response.dto';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    private readonly productsRepository: ProductRepository,
    // private prismaService: PrismaService,
  ) {}

  async getAllProducts(
    filters: GetAllProductsDTO,
  ): Promise<GetProductsResponseDTO> {
    const { categories, name, area, page = 1 } = filters;
    const limit = filters.limit ? Number(filters.limit) : 10;
    //  console.log('limit', limit);
    const skip = (page - 1) * limit;
    //   console.log('skip', skip);
    try {
      let products: ProductDTO[];
      let total: number;
      if (categories || name || area) {
        products = await this.productsRepository.findByFilters(
          { categories, name, area },
          skip,
          limit,
        );
        total = await this.productsRepository.countByFilters({
          categories,
          name,
          area,
        });
      } else {
        products = await this.productsRepository.findAll(skip, limit);
        total = await this.productsRepository.countAll();
      }
      const totalPages = Math.ceil(total / limit);
      return {
        data: products,
        metadata: {
          total,
          page,
          limit,
          totalPages,
        },
      };
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
