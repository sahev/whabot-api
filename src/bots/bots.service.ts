import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { ChatsServices } from "../chats/chats.service";
import { Chats } from "../chats/chats.entities"
import { Bots, Messages } from "../entities/index";
import { addBotsDTO, alterBotsDTO, getBotsDTO } from "./botsDTO";
import { Stages } from "../flows/stages/stages.entities";

@Injectable()
export class BotsServices {

  constructor(
    @InjectRepository(Bots) public botsRepository: Repository<Bots>,
    @InjectRepository(Messages) public messagesRepository: Repository<Messages>,
    @InjectRepository(Chats) public chatsRepository: Repository<Chats>,
    @InjectRepository(Stages) public staRepository: Repository<Stages>,
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

  async botInit(client, botId) {

   

     client.onMessage(async (message) => {
      // let res = await new WorkflowsServices(this.productsRepository, this.cartsRepository, this.messagesRepository).getInitials((await this.getBotId(client.session)), message)
      
      // classe do bot:
      // 1: a cada mensagem
      // 2: emito a mensagem recebida para a classe de workflow

      // classe do workflow:
      // 1: ouvinte das mensagens
      // 2: buscar na mensagem recebida uma palavra chave cadastrada
      // 3: se a palavra chave for encontrada, encaminhar a conversa para o próximo estágio e retornar a mensagem de resposta do estágio
      // 4: emitir uma mensagem com o retorno encontrado para a classe bot
      
      // classe bot:
      // 1: enviar a mensagem de resposta retornada da classe workflow

      if (!message.isGroupMsg) {
        console.log('origem: ', message.from, 'destino: ', message.to, 'receive message: ', message.body);
        
        let res = await new ChatsServices(this.chatsRepository, this.staRepository).onMessage(client, message, botId);
        console.log('bots service, ',res);
        
        client.sendText(message.from, res);

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
