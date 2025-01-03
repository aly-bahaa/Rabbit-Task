import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty({
    type: 'number',
    description: 'The ID of the customer',
    example: 1,
  })
  customerId: number;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        productId: { type: 'number', example: 1 },
        quantity: { type: 'number', example: 1 },
      },
    },
    description: 'List of items in the order',
  })
  items: { productId: number; quantity: number }[];
}
