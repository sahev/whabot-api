import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, getManager, getRepository, Repository, Server } from "typeorm";
import { Chats } from "./chats.entities";
import { ChatsDTO } from "./chats.dto";
import io from "socket.io";


@Injectable()
export class ChatsServices {
  constructor(
    @InjectRepository(Chats) private chatsRepository: Repository<Chats>
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
}
