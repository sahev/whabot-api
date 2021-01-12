import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, getManager, getRepository, Repository } from "typeorm";
import { Bots, Messages } from "../entities/index";
import { addBotsDTO, alterBotsDTO } from "./botsDTO";
import { MessagesService } from "../messages/messages.service";
import { botMessagesDTO } from "../entities/models/bots";

@Injectable()
export class BotsServices {
  constructor(
    @InjectRepository(Bots) private botsRepository: Repository<Bots>
  ) {}

  async getBot(data) {
    this.botsRepository.findOne({ bot_name: data });
  }

  async newBot(data: addBotsDTO) {
    try {
      let checkexists = await this.botsRepository.findOne({
        bot_name: data.bot_name,
      });
      if (checkexists.bot_name === data.bot_name) {
        return new BadRequestException("Bot exists").getResponse();
      }
    } catch {
      await this.botsRepository.save(data);
      return data;
    }
  }

  async alterBot(data: alterBotsDTO, botname: string) {
    await this.botsRepository.update({ bot_name: botname }, data);
    return await this.botsRepository.findOne({
      bot_name: data.bot_name,
    });
  }

  async botInit(client) {
        
     client.onMessage(async (message) => {
       
      const expected = await getManager()
      .createQueryBuilder(Messages, "messages")
      .where("mes_expected = :data", { data: message.body })
      .getOne();

      try {
        if (message.body === expected.mes_expected) {
          client.sendText(message.from, expected.mes_body);
        }
      } catch {}

    });
  }


}
