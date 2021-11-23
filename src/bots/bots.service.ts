import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { ChatsServices } from "../chats/chats.service";
import { Chats } from "../chats/chats.entities"
import { Bots, Messages } from "../entities/index";
import { addBotsDTO, alterBotsDTO, getBotsDTO } from "./botsDTO";
import { FundsService } from "../funds/funds.service";
import { create } from "venom-bot";

@Injectable()
export class BotsServices {

  constructor(
    @InjectRepository(Bots) public botsRepository: Repository<Bots>,
    @InjectRepository(Messages) public messagesRepository: Repository<Messages>,
    @InjectRepository(Chats) public chatsRepository: Repository<Chats>,
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
      
      let bot = await this.botsRepository.findOne({ bot_bot: botId })
      console.log('bot id', bot);

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

      if (!message.isGroupMsg && message.chatId == '5511981568415@c.us' || message.chatId == '5511997035927@c.us' || message.chatId == '5511970606771@c.us') {

        switch (bot.bot_type) {
          case 1: // workflow type
            console.log('origem: ', message.from, 'destino: ', message.to, 'receive message: ', message.body);
            let workResponse = await new ChatsServices(this.chatsRepository).onMessage(message, botId);
            client.sendText(message.from, workResponse);
            break;
          case 2: // fund type
            let fundResponse = await new FundsService().onMessage(message.body)
            console.log('fundresp ', fundResponse);
            client.sendText(message.from, fundResponse);
            break;
        }

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

  async startBot() {

    let strQrCode = "";
    let status = "";

    await create({
     session: 'Test',
      multidevice: false,
      
    })
      .then((client) => this.start(client))
      .catch((error) => console.log(error));

    if (status === "notLogged") {
      return strQrCode;
    }

  }

  start(client) {    
        client.onMessage((message) => {
      if (message.body === 'Hi' && message.isGroupMsg === false) {
        client
          .sendText(message.from, 'Welcome Venom 🕷')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
    });
  }
}
