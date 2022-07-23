import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import SessionsController from './sessions.controller';
import { Bots, Messages } from '../entities/index';
import { Chats } from '../chats/chats.entities';
import { Stages } from '../flows/stages/stages.entities';
import { Workflows } from '../flows/workflows/workflows.entities';
import { QueueModule } from 'src/messagequeue/queue.module';
import { Documents } from 'src/nlp/documents/documents.entities';
import { Responses } from 'src/nlp/responses/responses.entities';
import { DocumentsModule } from 'src/nlp/documents/documents.module';
import { ResponsesModule } from 'src/nlp/responses/responses.module';

@Module({
  controllers: [SessionsController],
  imports: [QueueModule, DocumentsModule, ResponsesModule, TypeOrmModule.forFeature([Documents, Responses, Bots, Messages, Chats, Stages, Workflows])],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
