/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SessionsService } from "./sessions.service";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { saveBrowserData } from "./saveBrowserData";
import { create } from "venom-bot";
import { Utils } from "../utils";

@Controller()
@Injectable()
export default class SessionsController {
  constructor(private sessionsServices: SessionsService) {}

  @Get("gettoken/:name")
  async getTokenBrowser(@Param("name") data: string) {
    let response = {};
    let bot = new Utils().getBrowserData(data);

    try {
      await bot
        .getSessionTokenBrowser()
        .then((result) => {
          response = result;
        })
        .catch((erro) => {
          console.error("Error getting token: ", erro);
        });
      return response;
    } catch {
      return new BadRequestException(
        "Bot not started or not found"
      ).getResponse();
    }
  }

  @Post("start/")
  async getQrCode(@Body() data: any) {
    let message = "";
  
    
    let databot = await this.sessionsServices.getBot(data.botId);

    if(databot) {
      if (databot.bot_enabled) {
        if(databot.bot_status === "notLogged" || databot.bot_status === "browserClose" || databot.bot_status === "autocloseCalled" ) {
         throw new HttpException({string: await this.sessionsServices.startBot(data.botId)}, HttpStatus.CREATED);
        } else {
          message = "Bot online"
        }
      } else {
        message = "Bot disabled"
      }
    } else {
      message = "Bot not found"
    }

    throw new HttpException({ message }, HttpStatus.OK)

    
  }

  @Get("botstatus/:name")
  getBotStatus(@Param("name") name: string) {
    var status = saveBrowserData.dataBrowser.some((bot) => {
      return bot.session === name;
    });
    return status;
  }

}
