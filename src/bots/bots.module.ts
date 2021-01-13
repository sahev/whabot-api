import { Module } from '@nestjs/common';
import { BotsServices } from './bots.service';
import BotsController from './bots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bots, Workflows, Products, Carts } from '../entities/index';

@Module({
  controllers: [BotsController],
  imports: [TypeOrmModule.forFeature([Bots, Workflows, Products, Carts])],
  providers: [BotsServices],
  exports: [BotsServices],
})
export class BotsModule {}
