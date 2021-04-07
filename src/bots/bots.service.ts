import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { Whatsapp } from "venom-bot";
import { Bots, Messages } from "../entities/index";
import { addBotsDTO, alterBotsDTO, getBotsDTO } from "./botsDTO";

@Injectable()
export class BotsServices {

  constructor(
    @InjectRepository(Bots) public botsRepository: Repository<Bots>,
    @InjectRepository(Messages) public messagesRepository: Repository<Messages>
  ) {
  }

  async getBot(data) {
    this.botsRepository.findOne({ bot_name: data });
  }

  async getBots(data: getBotsDTO) {
    return this.botsRepository.find({ bot_user: data.bot_user });
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

  async setQrCodeByBot(data: any, botId: number) {
    await this.botsRepository.update({ bot_bot: botId }, data);
    return await this.botsRepository.findOne({
      bot_bot: botId,
    });
  }

  async botInit(client) {

   

     client.onMessage(async (message) => {
      // let res = await new WorkflowsServices(this.productsRepository, this.cartsRepository, this.messagesRepository).getInitials((await this.getBotId(client.session)), message)
        
      if (!message.isGroupMsg) {
        console.log(message.from);
        
        // for (let i = 0; i < res.length; i++) {
        //   const reply = res[i];
        //   client.sendText(message.from, reply);
        // }
      }
    });
  }

  async getBotId(name) {
   return await getManager()
                  .createQueryBuilder(Bots, "bots")
                  .where("bot_name = :data", { data: name })
                  .getOne()
  }

}
