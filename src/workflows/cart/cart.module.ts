import { Module } from '@nestjs/common';
import { CartsService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from '../../entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([Carts])],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
