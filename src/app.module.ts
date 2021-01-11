import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { Users, Sessions, Messages, Bots } from './entities/index';
import { MessagesModule } from './messages/messages.module';



@Module({
  imports: [
    UsersModule,
    SessionsModule,
    MessagesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'whabot',
      entities: [Users, Sessions, Messages, Bots],
      synchronize: true,
      migrations: ["src/database/migrations/*.ts"],
      cli: {
        "migrationsDir": "migration"
      }
    }),
  ],
})

export class AppModule { }
