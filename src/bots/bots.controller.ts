/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BotsServices } from "./bots.service";
import { Body, Controller, Get, Param, Patch, Post, Query}  from "@nestjs/common";
import { identity } from "rxjs";
import { getBotsDTO } from "./botsDTO";
import { create, Whatsapp } from "venom-bot";

@Controller('bots')
export default class BotsController {
  constructor(private botsServices: BotsServices) {}

  @Post()
  newBot(@Body() data: any) {
    return this.botsServices.newBot(data)
  }

  @Patch(':botname')
  editBot(@Param('botname') botname, @Body() data: any) {
    return this.botsServices.alterBot(data, botname)
  }

  @Get()
  async getBots(@Query() data) {
    return await this.botsServices.getBots(data);
  }

  @Get('/test')
  startBot() {
    return this.botsServices.startBot();
  }
}
