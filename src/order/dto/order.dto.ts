import { ApiProperty } from '@nestjs/swagger';

export class OrderDTO {
  @ApiProperty({ type: 'number', description: 'The ID of the order' })
  id: number;
  @ApiProperty({ type: 'number', description: 'The ID of the customer' })
  customerId: number;
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        productId: { type: 'number' },
        quantity: { type: 'number' },
      },
    },
    description: 'List of items in the order',
  })
  createdAt: Date;
}
