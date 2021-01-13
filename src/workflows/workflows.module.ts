import { Module } from '@nestjs/common';
import { WorkflowsServices } from './workflows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts, Messages, Products, Workflows } from '../entities/index';
import WorkflowsController from './workflows.controller';

@Module({
  controllers: [WorkflowsController],
  imports: [TypeOrmModule.forFeature([Workflows, Products, Carts, Messages])],
  providers: [WorkflowsServices],
  exports: [WorkflowsServices],
})
export class WorkflowsModule {}
