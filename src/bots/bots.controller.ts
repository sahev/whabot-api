/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BotsServices } from "./bots.service";
import { Body, Controller, Get, Param, Patch, Post, Query}  from "@nestjs/common";
import { identity } from "rxjs";
import { getBotsDTO } from "./botsDTO";

@Controller()
export default class BotsController {
  constructor(private botsServices: BotsServices) {}

  @Post('bots')
  newBot(@Body() data: any) {
    return this.botsServices.newBot(data)
  }

  @Patch('bots/:botname')
  editBot(@Param('botname') botname, @Body() data: any) {
    return this.botsServices.alterBot(data, botname)
  }

  @Get('bots/')
  getBots(@Query() data) {
    return this.botsServices.getBots(data)
  }
}
