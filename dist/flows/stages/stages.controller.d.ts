import { StagesServices } from "./stages.service";
import { StagesDTO } from "./stages.dto";
export declare class StagesController {
    private staServices;
    constructor(staServices: StagesServices);
    getAllStages(): Promise<import("./stages.entities").Stages[]>;
    getStageByWorkflow(workflow: StagesDTO): Promise<import("./stages.entities").Stages[]>;
    updateStage(data: StagesDTO): Promise<import("typeorm").UpdateResult>;
    newStage(data: StagesDTO): Promise<string | object>;
    deleteStage(id: StagesDTO): Promise<import("typeorm").DeleteResult>;
}
