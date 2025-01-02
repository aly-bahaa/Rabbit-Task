import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from './product.module';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /products/mostOrdered', () => {
    it('should return the top products for an area', async () => {
      const mockData = [
        {
          id: 1,
          name: 'Product A',
          category: 'Category A',
          area: 'Zayed',
          total_quantity_ordered: 100,
          createdAt: new Date('2025-01-02T17:38:49.613Z'),
        },
      ];

      const productService = app.get(ProductService);
      jest
        .spyOn(productService, 'getMostOrderedProducts')
        .mockResolvedValue(mockData);

      const response = await request(app.getHttpServer())
        .get('/product/mostOrdered?area=Zayed')
        .expect(200);

      expect(response.body).toEqual([
        {
          id: 1,
          name: 'Product A',
          category: 'Category A',
          area: 'Zayed',
          total_quantity_ordered: 100,
          createdAt: '2025-01-02T17:38:49.613Z',
        },
      ]);
    });

    it('should throw an error without area query', async () => {
      const response = await request(app.getHttpServer())
        .get('/product/mostOrdered')
        .expect(400);

      expect(response.body.message).toEqual('Area query parameter is required');
    });
  });
});
