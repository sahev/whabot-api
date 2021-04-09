import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { WordKeysServices } from "./wordkeys.service"
import { WordKeysDTO } from "./wordkeys.dto"

@Controller('wordkeys')
export class WordKeysController {
  constructor(private wokServices: WordKeysServices) { }

  @Get()
  getAllWfs() {
    return this.wokServices.findAll();
  }  
  
  @Get(':wok_stage')
  getwordkeyByStage(@Param() wok_stage: WordKeysDTO) {
    return this.wokServices.wordkeyByStage(wok_stage);
  }
  
  @Post()
  newStage(@Body() data: WordKeysDTO){
    return this.wokServices.newWordKey(data);
  }   
  
  @Delete(':wok_wordkey')
  deleteWordkey(@Param() wok_wordkey: WordKeysDTO){
    return this.wokServices.deleteWordkey(wok_wordkey);
  }   
}
