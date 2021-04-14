/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MessagesService } from "./messages.service";
import { sendMessagesDTO, MessagesDTO } from "./messagesDTO";
import {
  BadRequestException,
  Body,
  Controller,
  Post
} from "@nestjs/common";
import { Utils } from '../utils/utils'



@Controller()
export default class MessagesController {
  constructor(private messagesServices: MessagesService) { }

  @Post("send/")
  async sendMessage(@Body() data: sendMessagesDTO) {
    let response = {};
    let bot = new Utils().getBrowserData(data.client)

    try {
      await bot
        .sendText(data.number + "@c.us", data.text)
        .then((result) => {
          response = result;
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro);
        });
      return response;
    } catch {
      return new BadRequestException(
        "Bot not started or not found"
      ).getResponse();
    }
  }

  @Post("message/")
  async newMessage(@Body() data: MessagesDTO) {
    
    return this.messagesServices.newMessage(data)
  }
}
