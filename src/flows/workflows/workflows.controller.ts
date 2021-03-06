import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { WorkflowsServices } from "./workflows.service"
import { WorkflowsDTO } from "./workflows.dto"

@Controller('workflows')
export class WorkflowsController {
  constructor(private wfServices: WorkflowsServices) { }

  @Get()
  getAllWfs() {
      return this.wfServices.findAll();
  }  
  
  @Get('bots')
  getWorkflowsByBot() {
    return this.wfServices.findAllBots();
  }
  
  @Post()
  createUser(@Body() data: WorkflowsDTO){
      return this.wfServices.newWorkflow(data);
  }    
}
