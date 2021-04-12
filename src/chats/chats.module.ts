import { Module } from '@nestjs/common';
import { ChatsServices } from './chats.service';
import ChatsController from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from './chats.entities';
import { Stages } from '../flows/stages/stages.entities'
import { GatewayModule } from '../socket/socket.module';
// import { ChatsSubscriber } from './chats.subscriber';

@Module({
  controllers: [ChatsController],
  imports: [TypeOrmModule.forFeature([Chats, Stages]), GatewayModule],
  providers: [ChatsServices],
  exports: [ChatsServices],
})
export class ChatsModule {}
