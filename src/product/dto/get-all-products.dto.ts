import { IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAllProductsDTO {
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  categories?: string[];

  name?: string;

  area?: string;

  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsInt()
  @Min(1)
  limit?: number = 10;
}
