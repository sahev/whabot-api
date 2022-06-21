import { Repository } from 'typeorm';
import { Bots } from '../../entities';
import { WorkflowsDTO } from './workflows.dto';
import { Workflows } from './workflows.entities';
export declare class WorkflowsServices {
    private workflowsRepository;
    private botsRepository;
    constructor(workflowsRepository: Repository<Workflows>, botsRepository: Repository<Bots>);
    findAll(): Promise<Workflows[]>;
    newWorkflow(data: WorkflowsDTO): Promise<string | object>;
    findAllBots(): Promise<Bots[]>;
}
