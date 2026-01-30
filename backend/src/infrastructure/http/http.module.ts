import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductController,
  ],
})
export class HttpModule {}
