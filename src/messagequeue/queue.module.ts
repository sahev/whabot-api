import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import QueueController from './queue.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [QueueController],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
