import { Repository } from 'typeorm';
import { ConditionalsDTO } from './conditionals.dto';
import { Conditionals } from './conditionals.entities';
export declare class ConditionalsServices {
    private conditionalsRepository;
    constructor(conditionalsRepository: Repository<Conditionals>);
    findAll(): Promise<Conditionals[]>;
    newConditional(data: ConditionalsDTO): Promise<string | object>;
    conditionalsByStage(con_stage: ConditionalsDTO): Promise<Conditionals[]>;
    deleteConditional(con_conditional: ConditionalsDTO): Promise<import("typeorm").DeleteResult>;
}
