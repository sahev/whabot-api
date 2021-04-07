import { Module } from '@nestjs/common';
import { BotsServices } from './bots.service';
import BotsController from './bots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bots, Messages } from '../entities/index';

@Module({
  controllers: [BotsController],
  imports: [TypeOrmModule.forFeature([Bots, Messages])],
  providers: [BotsServices],
  exports: [BotsServices],
})
export class BotsModule {}
