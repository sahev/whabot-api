/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FundsService } from "./funds.service";
import { FundsStructureDTO } from "./fundsDTO";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post
} from "@nestjs/common";

@Controller()
export default class MessagesController {
  constructor(private fundsService: FundsService) { }


  @Get('/:fund')
  async getFund(@Param('fund') fund: string) {
    
    const r = this.fundsService.getFund(fund)
    return await r
    
  }
}
