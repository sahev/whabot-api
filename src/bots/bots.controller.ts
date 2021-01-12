/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { BotsServices } from "./bots.service";
import { Body, Controller, Param, Patch, Post}  from "@nestjs/common";

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

}
