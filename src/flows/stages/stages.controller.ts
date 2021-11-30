import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { StagesServices } from "./stages.service"
import { StagesDTO } from "./stages.dto"

@Controller('stages')
export class StagesController {
  constructor(private staServices: StagesServices) { }

  @Get()
  getAllStages() {
    return this.staServices.findAll();
  }  
  
  @Get(':workflow')
  getStageByWorkflow(@Param() workflow: StagesDTO) {
    return this.staServices.stageByWorkflow(workflow);
  }
  
  @Put() 
  updateStage(@Body() data: StagesDTO) {
    return this.staServices.updateStage(data);
  }

  @Post()
  newStage(@Body() data: StagesDTO){
    return this.staServices.newStage(data);
  }   
  
  @Delete(':id')
  deleteStage(@Param() id: StagesDTO){
    return this.staServices.deleteStage(id);
  }   
}
