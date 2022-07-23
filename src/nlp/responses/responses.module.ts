import { Module } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ResponsesController from './responses.controller';
import { Responses } from './responses.entities';

@Module({
  controllers: [ResponsesController],
  imports: [TypeOrmModule.forFeature([Responses])],
  providers: [ResponsesService],
  exports: [ResponsesService],
})
export class ResponsesModule {}
