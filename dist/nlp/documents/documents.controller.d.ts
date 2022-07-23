import { DocumentsService } from "./documents.service";
import { DocumentsDTO } from "./DocumentsDTO";
export default class ResponsesController {
    private documentsService;
    constructor(documentsService: DocumentsService);
    getAllUsers(): Promise<import("./documents.entities").Documents[]>;
    createUser(data: DocumentsDTO): Promise<import("./documents.entities").Documents>;
}
