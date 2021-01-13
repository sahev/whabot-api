import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Messages } from "../entities/index";
import { Repository } from "typeorm";
import { MessagesDTO } from "./messagesDTO";

@Injectable()
export class MessagesService {
  private readonly users: Messages[];

  constructor(
    @InjectRepository(Messages) private messagesRepository: Repository<Messages>
  ) {}

  async newMessage(data: MessagesDTO) {
    const user = await this.messagesRepository.save(data)
    return user
  }

  async getMessagesType(data: string) {
    return await this.messagesRepository.findOne({ mes_type: data}) 
  }
}
