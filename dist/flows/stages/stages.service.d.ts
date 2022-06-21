import { Repository } from 'typeorm';
import { StagesDTO } from './stages.dto';
import { Stages } from './stages.entities';
export declare class StagesServices {
    private stagesRepository;
    constructor(stagesRepository: Repository<Stages>);
    findAll(): Promise<Stages[]>;
    updateStage(data: StagesDTO): Promise<import("typeorm").UpdateResult>;
    newStage(data: StagesDTO): Promise<string | object>;
    stageByWorkflow(workflow: StagesDTO): Promise<Stages[]>;
    deleteStage(id: StagesDTO): Promise<import("typeorm").DeleteResult>;
}
