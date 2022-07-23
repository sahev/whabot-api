import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponsesDTO } from './ResponsesDTO'
import { Responses } from './responses.entities'

@Injectable()
export class ResponsesService { 

  constructor(
    @InjectRepository(Responses) private responsesRepository: Repository<Responses>) {

  }

  findAll(): Promise<Responses[]> {
    return this.responsesRepository.find();
  }

  async create(data: ResponsesDTO) {
    return await this.responsesRepository.create(data);
  }

  async findAllByBot(botId: number): Promise<Responses[]> {
    let res = await this.responsesRepository
    .createQueryBuilder("responses")
    .innerJoin(
      "documents",
      "doc",
      "res_intent = doc_intent"
    )
    .innerJoin(
      "workflows",
      "wor",
      "doc_workflow = wor_workflow"
    )
    .innerJoin(
      "bots",
      "bot",
      "bot_workflow = wor_workflow and bot_enabled = 1"
    )
    .where("bot_bot = :bot", { bot: botId })
    .andWhere("wor_enabled = 1")
    .select()
    .getMany();

    return res;
  }
}