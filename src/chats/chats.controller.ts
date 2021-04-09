/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ChatsServices } from "./chats.service";
import { Body, Controller, Get, Param, Patch, Post}  from "@nestjs/common";
import { ChatsDTO } from "./chats.dto";

@Controller('chats')
export default class ChatsController {
  constructor(private chatsServices: ChatsServices) {}

  @Post()
  async setMessage(@Body() data: ChatsDTO) {
    return await this.chatsServices.setMessage(data)
  }

  @Get(':cha_customer')
  async getMessages(@Param('cha_customer') cha_customer: ChatsDTO) {
    return await this.chatsServices.getMessages(cha_customer);
  }
}
 