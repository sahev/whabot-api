import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { StagesServices } from "./stages.service"
import { StagesDTO } from "./stages.dto"

@Controller('stages')
export class StagesController {
  constructor(private staServices: StagesServices) { }

  @Get()
  getAllWfs() {
    return this.staServices.findAll();
  }  
  
  @Get(':sta_workflow')
  getStageByWorkflow(@Param() sta_workflow: StagesDTO) {
    return this.staServices.stageByWorkflow(sta_workflow);
  }
  
  @Post()
  newStage(@Body() data: StagesDTO){
    return this.staServices.newStage(data);
  }   
  
  @Delete(':sta_stage')
  deleteStage(@Param() sta_stage: StagesDTO){
    return this.staServices.deleteStage(sta_stage);
  }   
}
