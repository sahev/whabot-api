import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, getManager, getRepository, Repository, Server } from "typeorm";
import { Chats } from "./chats.entities";
import { ChatsDTO } from "./chats.dto";
import io from "socket.io";
import { Stages } from "../flows/stages/stages.entities";


@Injectable()
export class ChatsServices {
  constructor(
    @InjectRepository(Chats) private chatsRepository: Repository<Chats>,
    @InjectRepository(Stages) private staRepository: Repository<Stages>,
  ) { }

  async setMessage(data: ChatsDTO) {
    let r = await this.chatsRepository.save(data);

    return r;
  }

  async getMessages(cha_customer: ChatsDTO) {
    let r = await this.chatsRepository.find(cha_customer)

    // let r = this.chatsRepository
    //   .createQueryBuilder("chats")
    //   .where('cha_user = :user', { user: id } )
    //   .select(["cha_chat", "cha_user"])
    //   .getRawMany(); // or .getMany()

    return r;
  }

  async onMessage(client: object, message: any, botId): Promise<string> {
    const nextStage = await this.getNextStage(message.chatId, botId);
    console.log('on message', nextStage);
    
    
    let data = {
      cha_message: message.body,
      cha_chatId: message.chatId,
      cha_stage: nextStage.nextStage,
      cha_bot: botId,
    }

    console.log("data: ", data);
    
    let response: string;

    // await this.chatsRepository
    // .createQueryBuilder("chats")
    // .innerJoinAndSelect('Stages', 'sta', 'sta_parent = cha_stage')
    // .innerJoinAndSelect('Word_keys', 'wk', 'wok_stage = sta_stage')
    // .where('cha_chatid = :chatid', { chatid: message.chatId })
    // .select(['sta_stage'])
    // .getRawOne();
    let ex = await this.chatsRepository.findOne({ cha_chatId: message.chatId, cha_bot: botId })
    console.log('ex', ex);

    if (ex) {
      if (message.body.includes(nextStage.wok_word)) {
        console.log('contain ', nextStage.wok_response);
        await this.chatsRepository.update({ cha_chatId: message.chatId }, data)
        
        response = nextStage.wok_response
      }
    } else {

      console.log('new message ', nextStage.wok_response);
      await this.chatsRepository.save(data)
      response = nextStage.wok_response
    }

    console.log('response',response);
    

    return response;
  }

  async getNextStage(chatid, botId) {


      let nextStage = await this.chatsRepository
      .createQueryBuilder("chats")
      .innerJoinAndSelect('Word_keys', 'wk', 'cha_stage = wok_stage')
      .innerJoinAndSelect('stages', 'sta', 'cha_stage = sta_parent')
      .innerJoinAndSelect('workflows', 'wor', 'wor_workflow = sta_workflow and wor_enabled = 1')
      .where('cha_chatid = :chatid', { chatid })
      .andWhere('cha_bot = :bot', { bot: botId })
      .select(['cha_stage as actualStage', 'sta_stage as nextStage', 'wok_word', 'wok_response'])
      .getRawOne();
  
      
      if(nextStage == undefined) {
        let nextStage = await this.chatsRepository
        .query(`
          SELECT wok_stage as nextStage, wok_word, wok_response FROM chats
            RIGHT JOIN stages ON sta_stage = cha_stage
            RIGHT JOIN workflows ON sta_workflow = wor_workflow AND wor_enabled = 1
            RIGHT JOIN bots ON wor_bot = bot_bot
            RIGHT JOIN word_keys ON wok_stage = sta_parent
          WHERE sta_parent = 0 AND bot_bot = ${botId}
        `)
        console.log('new message: ', nextStage);
        
        return nextStage[0]
        
      } else {
        console.log('exists message', nextStage);
        return nextStage
      }


  }

  async deteleChat(client: any) {
    client.deleteChat(client.chatId)
  }
}
