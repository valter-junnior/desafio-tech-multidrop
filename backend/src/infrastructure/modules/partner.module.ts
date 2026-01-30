import { Module } from '@nestjs/common';
import { PartnerService } from '../../application/services/partner.service';
import { UserRepositoryPrisma } from '../database/prisma/repositories/user-repository.prisma';
import { SaleRepositoryPrisma } from '../database/prisma/repositories/sale-repository.prisma';
import { USER_REPOSITORY } from '../../core/repositories/user.repository';
import { SALE_REPOSITORY } from '../../core/repositories/sale.repository';

@Module({
  providers: [
    PartnerService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryPrisma,
    },
    {
      provide: SALE_REPOSITORY,
      useClass: SaleRepositoryPrisma,
    },
  ],
  exports: [PartnerService],
})
export class PartnerModule {}
