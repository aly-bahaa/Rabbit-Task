import { IsOptional, IsArray, IsString, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAllProductsDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  categories?: string[];

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  // @Transform(({ value }) => parseInt(value, 10))
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  //@Transform(({ value }) => parseInt(value, 10))
  limit?: number = 10;
}
