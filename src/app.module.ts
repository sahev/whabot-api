import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { Users, Sessions, Messages, Bots } from './entities/index';
import { MessagesModule } from './messages/messages.module';
import { BotsModule } from './bots/bots.module';
import { ChatsModule } from './chats/chats.module';
import { GatewayModule } from './socket/socket.module';
import { WorkflowsModule } from './flows/workflows/workflows.module';
import { StagesModule } from './flows/stages/stages.module'
import { ConditionalsModule } from './flows/conditionals/conditionals.module';
import { WordKeysModule } from './flows/wordkeys/wordkeys.module';
import { FundsModule } from './funds/funds.module';
import { Workflows } from './flows/workflows/workflows.entities';
import { Stages } from './flows/stages/stages.entities';
import { Conditionals } from './flows/conditionals/conditionals.entities'
import { WordKeys } from './flows/wordkeys/wordkeys.entities'
import { Chats } from './chats/chats.entities'


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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'whabot',
      entities: [Users, Sessions, Messages, Bots, Chats, Workflows, Stages, Conditionals, WordKeys],
      synchronize: true,
      migrations: ["src/database/migrations/*.ts"],
      cli: {
        "migrationsDir": "migration"
      }
    }),
  ],
})

export class AppModule { }
