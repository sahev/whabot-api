import { Module } from '@nestjs/common';
import { ProductsServices } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages, Products, Workflows } from '../entities/index';
import ProductsController from './products.controller';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Products, Workflows, Workflows, Messages])],
  providers: [ProductsServices],
  exports: [ProductsServices],
})
export class ProductsModule {}
