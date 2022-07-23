import { DocumentsService } from "./documents.service";
import { DocumentsDTO } from "./DocumentsDTO";
import { Body, Controller, Get, Post, Req } from "@nestjs/common";

@Controller('response')
export default class ResponsesController {
    constructor(private documentsService: DocumentsService) { }

    @Get()
    getAllUsers() {
        const allUsers = this.documentsService.findAll();
        return allUsers;
    }
    
    @Post()
    createUser(@Body() data: DocumentsDTO){
        return this.documentsService.create(data);
    }    
} 
