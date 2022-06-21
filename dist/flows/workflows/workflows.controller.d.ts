import { WorkflowsServices } from "./workflows.service";
import { WorkflowsDTO } from "./workflows.dto";
export declare class WorkflowsController {
    private wfServices;
    constructor(wfServices: WorkflowsServices);
    getAllWfs(): Promise<import("./workflows.entities").Workflows[]>;
    getWorkflowsByBot(): Promise<import("../../entities").Bots[]>;
    createUser(data: WorkflowsDTO): Promise<string | object>;
}
