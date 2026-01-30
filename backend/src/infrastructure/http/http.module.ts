import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ProductController } from './controllers/product.controller';
import { UserController } from './controllers/user.controller';
import { SaleController } from './controllers/sale.controller';
import { PartnerController } from './controllers/partner.controller';
import { ReportController } from './controllers/report.controller';
import { UserModule } from '../modules/user.module';
import { ProductModule } from '../modules/product.module';
import { SaleModule } from '../modules/sale.module';
import { PartnerModule } from '../modules/partner.module';
import { ReportModule } from '../modules/report.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    SaleModule,
    PartnerModule,
    ReportModule,
  ],
  controllers: [
    AppController,
    ProductController,
    UserController,
    SaleController,
    PartnerController,
    ReportController,
  ],
})
export class HttpModule {}
