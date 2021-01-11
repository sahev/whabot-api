/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SessionsService } from "./sessions.service";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { saveBrowserData } from "./saveBrowserData";
import { create } from "venom-bot";
import { Utils } from "../utils";

@Controller()
export default class SessionsController {
  constructor(private sessionsServices: SessionsService) {}

  @Get("gettoken/:name")
  async getTokenBrowser(@Param('name') data: string) {
    let response = {};
    let bot = new Utils().getBrowserData(data)
    
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
    let strQrCode = {};
    let status = {};

    await create(
      data.botname,
      (qrcode) => {
        if (qrcode) {
          strQrCode = qrcode;
          throw BadRequestException;
        }
      },
      //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
      (statusSession) => {
        switch (statusSession) {
          case "notLogged":
            status = "notLogged"
            break;  
          default:
            break;
        }
      },
      { logQR: false }
    )
      .then((client) => this.sessionsServices.start(client))
      .catch((error) => console.log(error));
    
      if (status === "notLogged") {
        return strQrCode
      }
  }

  @Get("botstatus/:name")
  getBotStatus(@Param("name") name: string) {
    var status = saveBrowserData.dataBrowser.some((bot) => {
      return bot.session === name;
    });
    return status;
  }
}
