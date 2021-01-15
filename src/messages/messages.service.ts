import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Messages } from "../entities/index";
import { Like, Repository } from "typeorm";
import { MessagesDTO } from "./messagesDTO";

@Injectable()
export class MessagesService {
  private readonly users: Messages[];

  constructor(
    @InjectRepository(Messages) private messagesRepository: Repository<Messages>
  ) {}

  async newMessage(data: MessagesDTO) {
    const user = await this.messagesRepository.save(data);
    return user;
  }

  async getMessagesType(data: string) {
    if (data === "step") {
      let e = await this.messagesRepository.find({ mes_options: data });
      return e;
    }
    return await this.messagesRepository.find({ mes_type: data });
  }

  async getMessagesShortcuts(data: string) {
    let d = /[0-9]/g;
    let g = /[-\/\\^$*+?.()|[\]{}]/g;

    if (data.match(d)) {
      return data;
    }
 
    let e = await this.messagesRepository
      .findOne({ mes_shortcut: data })
      .then((res) => {
        if (res) {
          return res.mes_type;
        } else return false;
      });

    let r = await this.messagesRepository.find()
    
    let s = r.map((s) => {
      if (data.indexOf(s.mes_shortcut) > 0) {
        console.log("log sssssss", s);
        
        return s.mes_type;
      }
    })

    if (!e) {
      return s.filter(x => { return x !== undefined })[0]
    }
    return e;
  }
}
