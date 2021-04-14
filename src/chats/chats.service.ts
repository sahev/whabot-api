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
    
    let response: string;
    const nextStage = await this.getNextStage(message.chatId, botId);

    let data = {
      cha_message: message.body,
      cha_chatId: message.chatId,
      cha_stage: nextStage.nextStage,
      cha_bot: botId,
    };


    try {
      await this.chatsRepository.save(data);
      response = nextStage.wok_response;

    } catch {
      if (message.body.includes(nextStage.wok_word)) {
        console.log('contem: ', nextStage.wok_word);
        
        await this.chatsRepository.update({ cha_chatId: message.chatId, cha_bot: botId }, data);

        response = nextStage.wok_response;
      }
    }

    console.log( `recebido: ${message.body}; esperado: ${nextStage.wok_word}; nextStage: ${nextStage.nextStage} `);
    
    return response;
  }

  async getNextStage(chatid, botId) {
    let nextStage = await this.chatsRepository
      .createQueryBuilder("chats")
      .innerJoinAndSelect("Word_keys", "wk", "cha_stage = wok_stage")
      .innerJoinAndSelect("stages", "sta", "cha_stage = sta_parent")
      .innerJoinAndSelect(
        "workflows",
        "wor",
        "wor_workflow = sta_workflow and wor_enabled = 1 and wok_workflow = wor_workflow AND wok_workflow = wor_workflow AND cha_bot = wor_bot"
      )
      .where("cha_bot = :bot", { bot: botId })
      .andWhere("cha_chatId = :chatid", { chatid: chatid })
      .select([
        "cha_stage as actualStage",
        "sta_stage as nextStage",
        "wok_word",
        "wok_response",
      ])
      .getRawOne();

    if (nextStage == undefined) {
      let nextStage = await this.chatsRepository.query(`
          SELECT sta_stage as nextStage, wok_word, wok_response FROM chats
            RIGHT JOIN stages ON sta_stage = cha_stage
            RIGHT JOIN workflows ON sta_workflow = wor_workflow AND wor_enabled = 1 
            RIGHT JOIN bots ON wor_bot = bot_bot
            RIGHT JOIN word_keys ON wok_stage = sta_parent and wok_workflow = wor_workflow AND wok_workflow = wor_workflow
          WHERE sta_parent = 0 AND bot_bot = ${botId}
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
