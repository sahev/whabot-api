import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Templates } from '../entities/index';
import TemplatesController from './templates.controller';

@Module({
  controllers: [TemplatesController],
  imports: [TypeOrmModule.forFeature([Templates])],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
