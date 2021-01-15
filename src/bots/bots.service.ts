import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, getConnection, getManager, getRepository, Repository } from "typeorm";
import { Bots, Carts, Messages, Products, Workflows } from "../entities/index";
import { addBotsDTO, alterBotsDTO } from "./botsDTO";
import { MessagesService } from "../messages/messages.service";
import { botMessagesDTO } from "../entities/models/bots";
import { WorkflowsServices } from "../workflows/workflows.service"
import { ProductsServices } from "../products/products.service";

@Injectable()
export class BotsServices {

  constructor(
    @InjectRepository(Bots) public botsRepository: Repository<Bots>,
    @InjectRepository(Products) public productsRepository: Repository<Products>,
    @InjectRepository(Workflows) public workflowsRepository: Repository<Workflows>,
    @InjectRepository(Carts) public cartsRepository: Repository<Carts>,
    @InjectRepository(Messages) public messagesRepository: Repository<Messages>
  ) {
  }

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
      let res = await new WorkflowsServices(this.workflowsRepository, this.productsRepository, this.cartsRepository, this.messagesRepository).getInitials((await this.getBotId(client.session)), message)
        
      if (!message.isGroupMsg) {
        for (let i = 0; i < res.length; i++) {
          const reply = res[i];
          client.sendText(message.from, reply);
        }
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
