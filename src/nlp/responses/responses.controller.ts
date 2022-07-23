/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ResponsesService } from "./responses.service";
import { ResponsesDTO } from "./ResponsesDTO"
import { Body, Controller, Get, Post, Req } from "@nestjs/common";

@Controller('response')
export default class ResponsesController {
    constructor(private responsesServices: ResponsesService) { }

    @Get()
    getAllUsers() {
        const allUsers = this.responsesServices.findAll();
        return allUsers;
    }
    
    @Post()
    createUser(@Body() data: ResponsesDTO){
        return this.responsesServices.create(data);
    }    
} 
