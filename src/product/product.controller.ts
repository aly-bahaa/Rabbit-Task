import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { GetProductsResponseDTO } from './dto/get-products-response.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async getAllProducts(
    @Query() filters: GetAllProductsDTO,
  ): Promise<GetProductsResponseDTO> {
    return this.productsService.getAllProducts(filters);
  }

  @Get('mostOrdered')
  async getMostOrderedProducts(@Query('area') area: string) {
    if (!area) {
      throw new Error('Area query parameter is required');
    }
    return this.productsService.getMostOrderedProducts(area);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }
}
