/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ChatsServices } from "./chats.service";
import { Body, Controller, Get, Param, Patch, Post}  from "@nestjs/common";
import { addChatsDTO } from "./chatsDTO";

@Controller()
export default class ChatsController {
  constructor(private chatsServices: ChatsServices) {}

  @Post("chats/")
  async logout(@Body() data: addChatsDTO) {
    return await this.chatsServices.setMessage(data)
  }

  @Get("chats/:id")
  async getMessages(@Param("id") id: string) {
    return await this.chatsServices.getMessages(id);
  }
}
 