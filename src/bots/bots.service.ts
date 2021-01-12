import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bots } from '../entities/index'
import { addBotsDTO, alterBotsDTO } from "./botsDTO";

@Injectable()
export class BotsServices {

  constructor(@InjectRepository(Bots) private botsRepository: Repository<Bots>) {

  }

  async getBot(data) {
    this.botsRepository.findOne({bot_name: data})
  }

  async newBot(data: addBotsDTO) {
    try {
      let checkexists = await this.botsRepository.findOne({ bot_name: data.bot_name });
      if (checkexists.bot_name === data.bot_name) {
        return new BadRequestException('Bot exists').getResponse();
      }
    } catch {
      await this.botsRepository.save(data);
      return data;
    }
  }

  async alterBot(data: alterBotsDTO, botname: string) {
    await this.botsRepository.update({bot_name: botname}, data);
    return await this.botsRepository.findOne({
      bot_name: data.bot_name 
    });
  }

}
