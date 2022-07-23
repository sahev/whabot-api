import { Repository } from 'typeorm';
import { DocumentsDTO } from './DocumentsDTO';
import { Documents } from './documents.entities';
export declare class DocumentsService {
    private documentsRepository;
    constructor(documentsRepository: Repository<Documents>);
    findAll(): Promise<Documents[]>;
    create(data: DocumentsDTO): Promise<Documents>;
    findAllByBot(botId: number): Promise<Documents[]>;
}
