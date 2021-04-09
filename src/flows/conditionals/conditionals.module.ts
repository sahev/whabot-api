import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConditionalsController } from './conditionals.controller';
import { Conditionals } from './conditionals.entities';
import { ConditionalsServices } from './conditionals.service';

@Module({
  controllers: [ConditionalsController],
  imports: [TypeOrmModule.forFeature([Conditionals])],
  providers: [ConditionalsServices],
  exports: [ConditionalsServices],
})
export class ConditionalsModule {}
