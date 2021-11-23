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
import { BrowserData } from "./BrowserData";
import { create } from "venom-bot";
import { Utils } from "../utils/utils";

@Controller()
@Injectable()
export default class SessionsController {
  constructor(private sessionsServices: SessionsService) {}

  @Post("logout/:id")
  async logout(@Param("id") id: string) {
    await this.sessionsServices.logout(id)
  }

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

    
  }

  @Get("botstatus/:botId")
  async getBotStatus(@Param("botId") botId: string) {
    // var status = BrowserData.dataBrowser.some((bot) => {
    //   console.log(bot.session, 'session');
      
    //   return bot.session === botId;
    // });
    var bot = await this.sessionsServices.getBot(parseInt(botId));
    console.log(bot.bot_status);
    let status;
    switch (bot.bot_status) {
      // notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || inChat || chatsAvailable
      case "notLogged":
        case "browserClose":
          case "qrReadFail":
        status = false;
        break;
    
      default:
        status = true;
        break;
    }

    if (!status) {
      await this.sessionsServices.setBotStatus(parseInt(botId), { bot_status: "notLogged" });
console.log(bot.bot_status, 'stauss');

    }
    return status;
  }

}
