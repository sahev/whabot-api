import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowsController } from './workflows.controller';
import { Workflows } from './workflows.entities';
import { WorkflowsServices } from './workflows.service';

@Module({
  controllers: [WorkflowsController],
  imports: [TypeOrmModule.forFeature([Workflows])],
  providers: [WorkflowsServices],
  exports: [WorkflowsServices],
})
export class WorkflowsModule {}
