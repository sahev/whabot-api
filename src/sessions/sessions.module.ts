import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import SessionsController from './sessions.controller';
import { Bots, Messages } from '../entities/index';

@Module({
  controllers: [SessionsController],
  imports: [TypeOrmModule.forFeature([Bots, Messages])],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
