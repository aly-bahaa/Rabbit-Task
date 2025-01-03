import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from './product.dto';

export class GetProductsResponseDTO {
  @ApiProperty({ type: [ProductDTO], description: 'List of products' })
  data: ProductDTO[];
  @ApiProperty({
    type: 'object',
    description: 'Pagination metadata',
    example: {
      total: 10,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
    additionalProperties: false,
  })
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
