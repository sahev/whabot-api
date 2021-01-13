import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection, getManager, getRepository, Repository } from "typeorm";
import { Chats } from "../entities/index";

@Injectable()
export class ChatsServices {
  constructor(
    @InjectRepository(Chats) private chatsRepository: Repository<Chats>
  ) {}

  

}
