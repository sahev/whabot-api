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
  
  @Get(':wor_bot')
  getWorkflowsByBot(@Param() wor_bot: number) {
    return this.wfServices.findByBot(wor_bot);
  }
  
  @Post()
  createUser(@Body() data: WorkflowsDTO){
      return this.wfServices.newWorkflow(data);
  }    
}
