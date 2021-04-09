import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StagesController } from './stages.controller';
import { Stages } from './stages.entities';
import { StagesServices } from './stages.service';

@Module({
  controllers: [StagesController],
  imports: [TypeOrmModule.forFeature([Stages])],
  providers: [StagesServices],
  exports: [StagesServices],
})
export class StagesModule {}
