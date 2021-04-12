import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import SessionsController from './sessions.controller';
import { Bots, Messages } from '../entities/index';
import { Chats } from '../chats/chats.entities';
import { Stages } from '../flows/stages/stages.entities';
import { Workflows } from '../flows/workflows.entities';

@Module({
  controllers: [SessionsController],
  imports: [TypeOrmModule.forFeature([Bots, Messages, Chats, Stages, Workflows])],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
