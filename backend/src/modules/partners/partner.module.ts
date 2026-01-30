import { Module } from '@nestjs/common';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { SaleModule } from '../sales/sale.module';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { USER_REPOSITORY } from '../../core/repositories/user.repository';
import { UserRepositoryPrisma } from '../../infrastructure/database/prisma/repositories/user-repository.prisma';

@Module({
  imports: [DatabaseModule, SaleModule],
  controllers: [PartnerController],
  providers: [
    PartnerService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryPrisma,
    },
  ],
})
export class PartnerModule {}
