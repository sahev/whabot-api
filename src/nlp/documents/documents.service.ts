import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentsDTO } from './DocumentsDTO';
import { Documents } from './documents.entities';

@Injectable()
export class DocumentsService { 

  constructor(
    @InjectRepository(Documents) private documentsRepository: Repository<Documents>) {

  }

  findAll(): Promise<Documents[]> {
    return this.documentsRepository.find();
  }

  async create(data: DocumentsDTO) {
    return this.documentsRepository.create(data);
  }

  async findAllByBot(botId: number): Promise<Documents[]> {
    let res = await this.documentsRepository
    .createQueryBuilder("documents")
    .innerJoin(
      "workflows",
      "wor",
      "wor_workflow = doc_workflow and wor_enabled = 1"
    )
    .innerJoin(
      "bots",
      "bot",
      "bot_workflow = wor_workflow and bot_enabled = 1"
    )
    .where("bot_bot = :bot", { bot: botId })
    .select()
    .getMany();

    return res;
  }
}