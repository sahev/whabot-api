import { Module } from '@nestjs/common';
import { BotsServices } from './bots.service';
import BotsController from './bots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bots } from '../entities';

@Module({
  controllers: [BotsController],
  imports: [TypeOrmModule.forFeature([Bots])],
  providers: [BotsServices],
  exports: [BotsServices],
})
export class BotsModule {}
