import { Module } from '@nestjs/common';
import { SaleService } from '../../application/services/sale.service';
import { SaleRepositoryPrisma } from '../database/prisma/repositories/sale-repository.prisma';
import { UserRepositoryPrisma } from '../database/prisma/repositories/user-repository.prisma';
import { ProductRepositoryPrisma } from '../database/prisma/repositories/product-repository.prisma';
import { SALE_REPOSITORY } from '../../core/repositories/sale.repository';
import { USER_REPOSITORY } from '../../core/repositories/user.repository';
import { PRODUCT_REPOSITORY } from '../../core/repositories/product.repository';

@Module({
  providers: [
    SaleService,
    {
      provide: SALE_REPOSITORY,
      useClass: SaleRepositoryPrisma,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryPrisma,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepositoryPrisma,
    },
  ],
  exports: [SaleService],
})
export class SaleModule {}
