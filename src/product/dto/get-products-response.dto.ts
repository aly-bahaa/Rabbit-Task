import { ProductDTO } from './product.dto';

export class GetProductsResponseDTO {
  data: ProductDTO[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
