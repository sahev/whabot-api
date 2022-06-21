import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignHistory, Messages } from '../entities/index';
import MessagesController from './messages.controller';

@Module({
  controllers: [MessagesController],
  imports: [TypeOrmModule.forFeature([Messages, CampaignHistory])],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
