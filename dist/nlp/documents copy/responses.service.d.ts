import { Repository } from 'typeorm';
import { DocumentsDTO } from './DocumentsDTO';
import { Documents } from './responses.entities';
export declare class ResponsesService {
    private responsesRepository;
    constructor(responsesRepository: Repository<Documents>);
    findAll(): Promise<Documents[]>;
    create(data: DocumentsDTO): Promise<Documents>;
}
