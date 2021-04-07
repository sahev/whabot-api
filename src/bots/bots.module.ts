import { Module } from '@nestjs/common';
import { BotsServices } from './bots.service';
import BotsController from './bots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bots, Messages } from '../entities/index';
import { GatewayModule } from '../socket/socket.module';
import { BotsSubscriber } from './bot.subscriber';

@Module({
  controllers: [BotsController],
  imports: [TypeOrmModule.forFeature([Bots, Messages]), GatewayModule],
  providers: [BotsServices, BotsSubscriber],
  exports: [BotsServices],
})
export class BotsModule {}
