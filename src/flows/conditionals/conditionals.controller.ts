import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ConditionalsServices } from "./conditionals.service"
import { ConditionalsDTO } from "./conditionals.dto"

@Controller('conditionals')
export class ConditionalsController {
  constructor(private conServices: ConditionalsServices) { }

  @Get()
  getAllWfs() {
    return this.conServices.findAll();
  }  
  
  @Get(':con_stage')
  getConditionalsByStage(@Param() con_stage: ConditionalsDTO) {
    return this.conServices.conditionalsByStage(con_stage);
  }
  
  @Post()
  newConditional(@Body() data: ConditionalsDTO){
    return this.conServices.newConditional(data);
  }   
  
  @Delete(':con_conditional')
  deleteConditional(@Param() con_conditional: ConditionalsDTO){
    return this.conServices.deleteConditional(con_conditional);
  }   
}
