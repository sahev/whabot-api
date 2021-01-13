import { Module } from '@nestjs/common';
import { ChatsServices } from './chats.service';
import ChatsController from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from '../entities';

@Module({
  controllers: [ChatsController],
  imports: [TypeOrmModule.forFeature([Chats])],
  providers: [ChatsServices],
  exports: [ChatsServices],
})
export class ChatsModule {}
