import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowsDTO } from './workflows.dto';
import { Workflows } from './workflows.entities';

@Injectable()
export class WorkflowsServices {
  constructor(
    @InjectRepository(Workflows) private workflowsRepository: Repository<Workflows>) {

  }

  async findAll() {
    return await this.workflowsRepository.find();
  }

  async newWorkflow(data: WorkflowsDTO) {
    try {
      return await this.workflowsRepository.save(data)
    } catch {
      return new BadRequestException(
        "Workflow already exists."
      ).getResponse();
    }
  }

  async findByBot(wor_bot: number) {
    return await this.workflowsRepository.find({ wor_bot })
  }

}
