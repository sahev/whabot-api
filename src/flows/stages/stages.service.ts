import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StagesDTO } from './stages.dto';
import { Stages } from './stages.entities';

@Injectable()
export class StagesServices {
  constructor(
    @InjectRepository(Stages) private stagesRepository: Repository<Stages>) {

  }

  async findAll() {
    return await this.stagesRepository.find();
  }

  async updateStage(data: StagesDTO) {
    return await this.stagesRepository.update({ id: data.id }, data)
  }

  async newStage(data: StagesDTO) {
    try {
      return await this.stagesRepository.save(data)
    } catch {
      return new BadRequestException(
        "Stage already exists."
      ).getResponse();
    }
  }

  async stageByWorkflow(workflow: StagesDTO) {
    return await this.stagesRepository.find(workflow)
  }

  async deleteStage(id: StagesDTO) {
    return await this.stagesRepository.delete(id)
  }
}
