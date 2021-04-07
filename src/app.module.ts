import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { Users, Sessions, Messages, Bots, Chats } from './entities/index';
import { MessagesModule } from './messages/messages.module';
import { BotsModule } from './bots/bots.module';
import { ChatsModule } from './chats/chats.module';
import { AppGatewayModule } from './socket/socket.module';



@Module({
  imports: [
    UsersModule,
    SessionsModule,
    MessagesModule,
    BotsModule,
    ChatsModule,
    AppGatewayModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'whabot',
      entities: [Users, Sessions, Messages, Bots, Chats],
      synchronize: true,
      migrations: ["src/database/migrations/*.ts"],
      cli: {
        "migrationsDir": "migration"
      }
    }),
  ],
})

export class AppModule { }
