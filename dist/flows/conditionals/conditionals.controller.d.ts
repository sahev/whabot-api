import { ConditionalsServices } from "./conditionals.service";
import { ConditionalsDTO } from "./conditionals.dto";
export declare class ConditionalsController {
    private conServices;
    constructor(conServices: ConditionalsServices);
    getAllWfs(): Promise<import("./conditionals.entities").Conditionals[]>;
    getConditionalsByStage(con_stage: ConditionalsDTO): Promise<import("./conditionals.entities").Conditionals[]>;
    newConditional(data: ConditionalsDTO): Promise<string | object>;
    deleteConditional(con_conditional: ConditionalsDTO): Promise<import("typeorm").DeleteResult>;
}
