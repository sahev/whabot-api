import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stages } from '../stages/stages.entities';
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

  async linksByWorkflow(workflow) {
    return await this.linksRepository.query(`select l.id, l.from, l.to from links l
    inner join stages s on l.from = s.id 
    where s.workflow = ${workflow}`)

    // return await this.linksRepository.find(workflow)
  }

  async deleteLink(id: LinksDTO) {
    return await this.linksRepository.delete(id)
  }
}
