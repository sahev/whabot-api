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

  @Post("send/")
  async sendMessage(@Body() data: sendMessagesDTO) {
    let response = {};
    let bot = new Utils().getBrowserData(data.client)

    try {
      await bot
      // @ts-ignore
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

  @Post('messages/send')
  async sendMessages(
    @Body(ValidationPipe) sendMessagesDto: SendMessagesCampaignDTO,
  ): Promise<any> {

    this.messagesServices.sender(sendMessagesDto);
    
    // const columns = sendMessagesDto.columnSheet.shift();
    // console.log(sendMessagesDto.columnSheet.length, 'linhas');

    // let clientBot = new Utils().getBrowserData(sendMessagesDto.botId);
    
    // for (let index = 0; index < sendMessagesDto.columnSheet.length; index++) {
    //   console.log(index);
      
    //   let formatedMessage = sendMessagesDto.message;
    //   columns.map((itemColumns, idx) => {
    //     if (sendMessagesDto.message.includes(`{${itemColumns}}`)) {
    //       formatedMessage = formatedMessage.replace(
    //         `{${itemColumns}}`,
    //         sendMessagesDto.columnSheet[index][idx],
    //       );
    //     }
    //   });

      // console.log(sendMessagesDto.columnSheet[index][0], 'numero')
      // console.log(formatedMessage, 'mensagem')
      // await this.messagesServices.execute(
      //   clientBot,
      //   sendMessagesDto.columnSheet[index][0],
      //   formatedMessage,
      // );

    // }
  }
}
