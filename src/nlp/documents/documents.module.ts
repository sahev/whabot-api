import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DocumentsController from './documents.controller';
import { Documents } from './documents.entities';

@Module({
  controllers: [DocumentsController],
  imports: [TypeOrmModule.forFeature([Documents])],
  providers: [DocumentsService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
