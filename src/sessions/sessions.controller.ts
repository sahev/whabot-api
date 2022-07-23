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
  constructor(private sessionsServices: SessionsService) { }

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
      // @ts-ignore
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
    let databot = await this.sessionsServices.getBot(data.botId);
    return { string: await this.sessionsServices.startBot(data.botId) };
  }

  @Get("botstatus/:botId")
  async getBotStatus(@Param("botId") botId: string) {
    return await this.sessionsServices.getBotStatus(parseInt(botId));
  }
}
