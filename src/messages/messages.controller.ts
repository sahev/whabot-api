/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MessagesService } from "./messages.service";
import { MessagesDTO } from "./messagesDTO";
import {
  BadRequestException,
  Body,
  Controller,
  Post
} from "@nestjs/common";
import { saveBrowserData } from "../sessions/saveBrowserData";
import { Utils } from '../utils'

@Controller()
export default class MessagesController {
  constructor(private MessagessService: MessagesService) {}

  @Post("send/")
  async sendMessage(@Body() data: MessagesDTO) {
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
}
