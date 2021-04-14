import { Module } from '@nestjs/common';
import { BotsServices } from './bots.service';
import BotsController from './bots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bots, Messages } from '../entities/index';
import { Chats } from "../chats/chats.entities"
import { GatewayModule } from '../socket/socket.module';
import { BotsSubscriber } from './bot.subscriber';
import { Stages } from '../flows/stages/stages.entities';
import { Workflows } from '../flows/workflows/workflows.entities';

@Module({
  controllers: [BotsController],
  imports: [TypeOrmModule.forFeature([Bots, Messages, Chats, Stages, Workflows]), GatewayModule],
  providers: [BotsServices, BotsSubscriber],
  exports: [BotsServices],
})
export class BotsModule {}
