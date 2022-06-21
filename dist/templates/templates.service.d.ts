import { BadRequestException } from '@nestjs/common';
import { Templates } from '../entities/index';
import { Repository } from 'typeorm';
import { TemplatesDTO } from './templates.dto';
export declare class TemplatesService {
    private templatesRepository;
    private readonly users;
    constructor(templatesRepository: Repository<Templates>);
    findAll(): Promise<Templates[]>;
    delete(data: Templates): Promise<import("typeorm").DeleteResult>;
    create(data: TemplatesDTO): Promise<Templates | BadRequestException>;
    update(template: Templates): Promise<string | object>;
}
