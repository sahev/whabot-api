import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from '../entities/index';
import MessagesController from './messages.controller';

@Module({
  controllers: [MessagesController],
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
