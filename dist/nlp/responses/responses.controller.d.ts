import { ResponsesService } from "./responses.service";
import { ResponsesDTO } from "./ResponsesDTO";
export default class ResponsesController {
    private responsesServices;
    constructor(responsesServices: ResponsesService);
    getAllUsers(): Promise<import("./responses.entities").Responses[]>;
    createUser(data: ResponsesDTO): Promise<import("./responses.entities").Responses>;
}
