import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinksDTO } from './links.dto';
import { Links } from './links.entities';

@Injectable()
export class LinksServices {
  constructor(
    @InjectRepository(Links) private linksRepository: Repository<Links>) {

  }

  async findAll() {
    return await this.linksRepository.find();
  }

  async newLink(data: LinksDTO) {
      return await this.linksRepository.save(data);
  }

  async linksByStage(to: LinksDTO) {
    return await this.linksRepository.find(to)
  }

  async deleteLink(id: LinksDTO) {
    return await this.linksRepository.delete(id)
  }
}
