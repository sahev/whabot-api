import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { Users, Sessions, Messages, Bots, CampaignHistory, Templates } from './entities/index';
import { MessagesModule } from './messages/messages.module';
import { BotsModule } from './bots/bots.module';
import { ChatsModule } from './chats/chats.module';
import { QueueModule } from './messagequeue/queue.module';
import { GatewayModule } from './socket/socket.module';
import { WorkflowsModule } from './flows/workflows/workflows.module';
import { StagesModule } from './flows/stages/stages.module'
import { ConditionalsModule } from './flows/conditionals/conditionals.module';
import { LinksModule } from './flows/links/links.module';
import { WordKeysModule } from './flows/wordkeys/wordkeys.module';
import { FundsModule } from './funds/funds.module';
import { TemplatesModule } from './templates/templates.module';
import { Links } from './flows/links/links.entities';
import { Workflows } from './flows/workflows/workflows.entities';
import { Stages } from './flows/stages/stages.entities';
import { Conditionals } from './flows/conditionals/conditionals.entities'
import { WordKeys } from './flows/wordkeys/wordkeys.entities'
import { Chats } from './chats/chats.entities'
import { Documents } from './nlp/documents/documents.entities'
import { Responses } from './nlp/responses/responses.entities'
import { DocumentsModule } from './nlp/documents/documents.module';
import { ResponsesModule } from './nlp/responses/responses.module';


@Module({
  imports: [
    UsersModule,
    SessionsModule,
    MessagesModule,
    BotsModule,
    ChatsModule,
    GatewayModule,
    WorkflowsModule,
    StagesModule,
    ConditionalsModule,
    WordKeysModule,
    FundsModule,
    LinksModule,
    TemplatesModule,
    QueueModule,
    DocumentsModule,
    ResponsesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'whabot',
      charset: "utf8mb4_unicode_ci",
      entities: [Documents, Responses, Templates, CampaignHistory, Users, Sessions, Messages, Bots, Chats, Workflows, Stages, Conditionals, WordKeys, Links],
      synchronize: true,
      migrations: ["src/database/migrations/*.ts"],
      
    }),
  ],
})

export class AppModule { }
