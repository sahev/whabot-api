import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Templates } from '../entities/index';
import { Repository } from 'typeorm';
import { TemplatesDTO } from './templates.dto';

@Injectable()
export class TemplatesService { 
  private readonly users: Templates[];

  constructor(
    @InjectRepository(Templates) private templatesRepository: Repository<Templates>) {

  }

  async findAll(): Promise<Templates[]> {
    return await this.templatesRepository.find();
  }

  delete(data: Templates) {
    return this.templatesRepository.delete(data);
  }

  async create(data: TemplatesDTO) {
    const template = await this.templatesRepository.create(data);

    try {
      let checkexists = await this.templatesRepository.findOne({ tem_name: data.tem_name });
      if (checkexists.tem_name === data.tem_name) {
        return new BadRequestException('Modelo existente');
      }
    } catch {
      await this.templatesRepository.save(template);      
      return template;
    }
  }

  async update(template: Templates) {
    let checkExists = await this.templatesRepository.findOne({
      tem_name: template.tem_name,
    });

    if (checkExists.tem_template !== template.tem_template ) return new BadRequestException(
      "Model name already exists."
    ).getResponse();

    await this.templatesRepository.update({ tem_template: template.tem_template }, template);
    return await this.templatesRepository.findOne({
      tem_name: template.tem_name,
    });
  }

}