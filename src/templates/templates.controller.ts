/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TemplatesService } from "./templates.service";
import { TemplatesDTO } from "./templates.dto";
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { Templates } from '../entities/index';

@Controller('templates')
export default class TemplatesController {
    constructor(private templateServices: TemplatesService) { }

    @Get('all')
    getAll() {
        return this.templateServices.findAll();
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() data: TemplatesDTO){
        return this.templateServices.create(data);
    }    

    @Delete(':tem_template')
    @UsePipes(ValidationPipe)
    delete(@Param() template: Templates) {
        return this.templateServices.delete(template);
    }

    @Patch()
    @UsePipes(ValidationPipe)
    update(@Body() template: Templates) {
        return this.templateServices.update(template);
    }
} 
