/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MessagesService } from "./messages.service";
import { sendMessagesDTO, MessagesDTO, SendMessagesCampaignDTO } from "./messagesDTO";
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  ValidationPipe
} from "@nestjs/common";
import { Utils } from '../utils/utils'



@Controller()
export default class MessagesController {
  constructor(private messagesServices: MessagesService) { }

  @Post("send/message")
  async sendMessage(@Body() data: sendMessagesDTO) {
    return await this.messagesServices.sendMessage(data);
  }

  @Post("message/")
  async newMessage(@Body() data: MessagesDTO) {

    return this.messagesServices.newMessage(data)
  }

  @Post('messages/send')
  async sendMessages(
    @Body(ValidationPipe) sendMessagesDto: SendMessagesCampaignDTO,
  ): Promise<any> {
    this.messagesServices.sender(sendMessagesDto);
  }
}
