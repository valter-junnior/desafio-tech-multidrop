import { Module } from '@nestjs/common';
import { ProductService } from '../../application/services/product.service';
import { ProductRepositoryPrisma } from '../database/prisma/repositories/product-repository.prisma';
import { PRODUCT_REPOSITORY } from '../../core/repositories/product.repository';

@Module({
  providers: [
    ProductService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepositoryPrisma,
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
