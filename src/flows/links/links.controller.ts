import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { LinksServices } from "./links.service"
import { LinksDTO } from "./links.dto"

@Controller('link')
export class LinksController {
  constructor(private linkServices: LinksServices) { }

  @Get('/all')
  getAllLinks() {
    return this.linkServices.findAll();
  }  
  
  @Get(':id')
  linksByWorkflow(@Param() id) {    
    return this.linkServices.linksByWorkflow(id.id);
  }
  
  @Post()
  newLink(@Body() data: LinksDTO){
    return this.linkServices.newLink(data);
  }   
  
  @Delete(':id')
  deleteLink(@Param() id: LinksDTO){
    return this.linkServices.deleteLink(id);
  }   
}
