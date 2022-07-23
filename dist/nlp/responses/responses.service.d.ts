import { Repository } from 'typeorm';
import { ResponsesDTO } from './ResponsesDTO';
import { Responses } from './responses.entities';
export declare class ResponsesService {
    private responsesRepository;
    constructor(responsesRepository: Repository<Responses>);
    findAll(): Promise<Responses[]>;
    create(data: ResponsesDTO): Promise<Responses>;
    findAllByBot(botId: number): Promise<Responses[]>;
}
