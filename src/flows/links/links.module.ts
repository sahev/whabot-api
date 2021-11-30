import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinksController } from './links.controller';
import { Links } from './links.entities';
import { LinksServices } from './links.service';

@Module({
  controllers: [LinksController],
  imports: [TypeOrmModule.forFeature([Links])],
  providers: [LinksServices],
  exports: [LinksServices],
})
export class LinksModule {}
