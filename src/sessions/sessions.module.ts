import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import SessionsController from './sessions.controller';
import { Bots } from '../entities/index';
import { BotsServices } from '../bots/bots.service';

@Module({
  controllers: [SessionsController],
  imports: [TypeOrmModule.forFeature([Bots])],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
