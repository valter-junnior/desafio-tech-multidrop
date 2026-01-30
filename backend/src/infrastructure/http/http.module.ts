import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ProductController } from './controllers/product.controller';
import { UserController } from './controllers/user.controller';
import { SaleController } from './controllers/sale.controller';

@Module({
  controllers: [
    AppController,
    ProductController,
    UserController,
    SaleController,
  ],
})
export class HttpModule {}
