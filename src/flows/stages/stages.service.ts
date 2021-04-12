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

  async newStage(data: StagesDTO) {
    try {
      let { parent } = await this.stagesRepository.createQueryBuilder("stages")
      .where('sta_workflow = :workflow', { workflow: data.sta_workflow })
      .select(['sta_stage as parent'])
      .orderBy('sta_stage', "DESC")
      .getRawOne();

      data.sta_parent = parent;      
         
      return await this.stagesRepository.save(data)

    } catch {
      return new BadRequestException(
        "Stage already exists."
      ).getResponse();
    }
  }

  async stageByWorkflow(sta_workflow: StagesDTO) {
    return await this.stagesRepository.find(sta_workflow)
  }

  async deleteStage(sta_stage: StagesDTO) {
    return await this.stagesRepository.delete(sta_stage)
  }
}
