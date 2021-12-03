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

  async newLink(data: Array<LinksDTO>, workflowId) {
    data.map(async link => {
      link.id = link.id % 10000;      
      link.workflow = workflowId;
    });       
    return await this.linksRepository.save(data)
  }

  async linksByWorkflow(workflow) {    
    return await this.linksRepository.find({ workflow })
  }

  async deleteLink(id: LinksDTO) {
    return await this.linksRepository.delete(id)
  }
}
