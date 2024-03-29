import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  getConnection,
  getManager,
  getRepository,
  Repository,
  Server,
} from "typeorm";
import { Chats } from "./chats.entities";
import { ChatsDTO } from "./chats.dto";

@Injectable()
export class ChatsServices {
  constructor(
    @InjectRepository(Chats) private chatsRepository: Repository<Chats>
  ) {}

  async setMessage(data: ChatsDTO) {
    let r = await this.chatsRepository.save(data);

    return r;
  }

  async getMessages(cha_customer: ChatsDTO) {
    let r = await this.chatsRepository.find(cha_customer);
    return r;
  }

  async onMessage(message: any, botId): Promise<string> {
  

    let response = '';
    const nextStage = await this.getNextStage(message.key.remoteJid, botId);
    
    // if (message.messageStubParameters.length == 1)
    //   return;
      
    let data = {
      cha_message: message.message.conversation,
      cha_chatId: message.key.remoteJid,
      cha_stage: nextStage.nextStage,
      cha_bot: botId,
    };
    
    try {
      await this.chatsRepository.save(data);
      response = nextStage.wok_response;      
    } catch {      
      if ( message.message.conversation.includes(nextStage.wok_word)) {
        await this.chatsRepository.update({ cha_chatId: message.key.remoteJid, cha_bot: botId }, data);
        response = nextStage.wok_response;
      } else if (nextStage.actualStage > 0) {
        console.log('response mensagem invalida');
        response = nextStage.wok_invalidWord; // responde o usuário com uma mensagem inválida cadastrada caso o estágio for > 0
      } else {
        response = nextStage.wok_word; // responde o usuário idependente da mensagem enviada caso o estágio seja 0
        console.log('responde com wokword do proximo estagio');
      }


    }

    if (!response) {
      response = nextStage.wok_word;
    }
    console.log( `botid: ${botId}; recebido: ${message.message.conversation}; esperado: ${nextStage.wok_word}; resposta: ${response}; actualStage: ${nextStage.actualStage}; nextStage: ${nextStage.nextStage} `);
    return response;
  }

  async getNextStage(chatid, botId) {
    let nextStage = await this.chatsRepository
      .createQueryBuilder("chats")
      .innerJoinAndSelect("Word_keys", "wk", "cha_stage = wok_stage")
      .innerJoinAndSelect("stages", "sta", "cha_stage = parent")
      .innerJoinAndSelect(
        "workflows",
        "wor",
        "wor_workflow = workflow and wor_enabled = 1 and wok_workflow = wor_workflow AND cha_bot = wor_bot"
      )
      .where("cha_bot = :bot", { bot: botId })
      .andWhere("cha_chatId = :chatid", { chatid: chatid })
      .select([
        "cha_stage as actualStage",
        "id as nextStage",
        "wok_word",
        "wok_response",
        "wok_invalidWord"
      ])
      .getRawOne();

    if (nextStage == undefined) {
      
      let nextStage = await this.chatsRepository.query(`
      SELECT id as nextStage, wok_word, wok_response FROM chats
      RIGHT JOIN stages ON id = cha_stage
      RIGHT JOIN workflows ON workflow = wor_workflow AND wor_enabled = 1 
      RIGHT JOIN bots ON wor_workflow = bot_workflow
      RIGHT JOIN word_keys ON wok_stage = parent and wok_workflow = wor_workflow AND wok_workflow = wor_workflow
      WHERE parent = 0 AND bot_bot = ${botId}
      `);
      
      console.log("new message: ", nextStage);

      return nextStage[0];
    } else {
      console.log("exists message: ", nextStage);
      return nextStage;
    }
  }

  async deteleChat(client: any) {
    client.deleteChat(client.chatId);
  }
}
