import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConditionalsDTO } from './conditionals.dto';
import { Conditionals } from './conditionals.entities';

@Injectable()
export class ConditionalsServices {
  constructor(
    @InjectRepository(Conditionals) private conditionalsRepository: Repository<Conditionals>) {

  }

  async findAll() {
    return await this.conditionalsRepository.find();
  }

  async newConditional(data: ConditionalsDTO) {
    try {
      return await this.conditionalsRepository.save(data)
    } catch {
      return new BadRequestException(
        "Conditional already exists for the same stage."
      ).getResponse();
    }
  }

  async conditionalsByStage(con_stage: ConditionalsDTO) {
    return await this.conditionalsRepository.find(con_stage)
  }

  async deleteConditional(con_conditional: ConditionalsDTO) {
    return await this.conditionalsRepository.delete(con_conditional)
  }
}
