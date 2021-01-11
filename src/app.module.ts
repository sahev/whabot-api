import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Users, Sessions, Messages, Bots } from './entities/index';



@Module({
  imports: [
    UsersModule,
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