import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { GetProductsResponseDTO } from './dto/get-products-response.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
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
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    summary: 'Get the top 10 most ordered products in a specific area',
  })
  @ApiQuery({
    name: 'area',
    example: 'Zayed',
    description: 'The area to filter products by',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the top 10 most ordered products',
    type: GetProductsResponseDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Area query parameter is required',
  })
  async getMostOrderedProducts(@Query('area') area: string) {
    console.log();
    if (!area) {
      throw new BadRequestException('Area query parameter is required');
    }
    return this.productsService.getMostOrderedProducts(area);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }
}
