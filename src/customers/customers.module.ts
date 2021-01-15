import { Module } from '@nestjs/common';
import { CustomersServices } from './customers.service';
import CustomersController from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from '../entities';

@Module({
  controllers: [CustomersController],
  imports: [TypeOrmModule.forFeature([Customers])],
  providers: [CustomersServices],
  exports: [CustomersServices],
})
export class CustomersModule {}
