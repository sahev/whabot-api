import { ResponsesService } from "./responses.service";
import { DocumentsDTO } from "./DocumentsDTO";
export default class ResponsesController {
    private responsesServices;
    constructor(responsesServices: ResponsesService);
    getAllUsers(): Promise<import("./responses.entities").Documents[]>;
    createUser(data: DocumentsDTO): Promise<import("./responses.entities").Documents>;
}
