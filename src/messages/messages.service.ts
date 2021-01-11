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

  async create(data: MessagesDTO) {}

  getClient(data: any, clientName: any) {
    let resp = [];
    data.map((res) => {
      if (res.session === clientName) resp = res;
    });
    return resp;
  }
}
