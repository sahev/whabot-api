import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowsController } from './workflows.controller';
import { Workflows } from './workflows.entities';
import { Bots } from '../../entities/index';
import { WorkflowsServices } from './workflows.service';

@Module({
  controllers: [WorkflowsController],
  imports: [TypeOrmModule.forFeature([Workflows, Bots])],
  providers: [WorkflowsServices],
  exports: [WorkflowsServices],
})
export class WorkflowsModule {}
