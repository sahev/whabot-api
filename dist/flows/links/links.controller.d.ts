import { LinksServices } from "./links.service";
import { LinksDTO } from "./links.dto";
export declare class LinksController {
    private linkServices;
    constructor(linkServices: LinksServices);
    getAllLinks(): Promise<import("./links.entities").Links[]>;
    linksByWorkflow(id: any): Promise<import("./links.entities").Links[]>;
    newLink(workflowId: any, data: Array<LinksDTO>): Promise<(LinksDTO & import("./links.entities").Links)[]>;
    deleteLink(id: LinksDTO): Promise<import("typeorm").DeleteResult>;
}
