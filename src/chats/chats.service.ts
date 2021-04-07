import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, getManager, getRepository, Repository, Server } from "typeorm";
import { Chats } from "../entities/index";
import { addChatsDTO } from "./chatsDTO";
import io from "socket.io";


@Injectable()
export class ChatsServices {
  constructor(
    @InjectRepository(Chats) private chatsRepository: Repository<Chats>
  ) {
    // let initial_result;

    // let thiss = this;

    // setTimeout(async function () {
    //   let r = await this.getMessages("string").then((res) => {
    //     initial_result = initial_result || res;

    //     if (Changed(initial_result, res)) {
    //       // socket.emit("changed", res);
    //       const { Server } = require('socket.io')()


    //     }
        
    //     console.log(r);
        
    //   });
    // }, 1000);

    // function Changed(pre, now) {
    //   if (pre != now) return true;
    // }
    
  }

  async setMessage(data: addChatsDTO) {
    let r = await this.chatsRepository.save(data);

    return r;
  }

  async getMessages(id: string) {
    console.log("exec");

    // let r = await this.chatsRepository.find({ cha_user: id })

    let r = this.chatsRepository
      .createQueryBuilder("chats")
      .select(["cha_chat", "cha_user"])
      .getRawMany(); // or .getMany()

    return r;
  }
}
