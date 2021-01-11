/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UsersService } from "./users.service";
import { UsersDTO } from "./usersDTO";
import { Body, Controller, Get, Post, Req } from "@nestjs/common";

@Controller()
export default class UserController {
    constructor(private userServices: UsersService) { }

    @Get('users/')
    getAllUsers() {
        const allUsers = this.userServices.findAll();
        return allUsers;
    }
    
    @Post('users/')
    createUser(@Body() data: UsersDTO){
        return this.userServices.create(data);
    }    
} 
