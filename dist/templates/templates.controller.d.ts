import { TemplatesService } from "./templates.service";
import { TemplatesDTO } from "./templates.dto";
import { Templates } from '../entities/index';
export default class TemplatesController {
    private templateServices;
    constructor(templateServices: TemplatesService);
    getAll(): Promise<Templates[]>;
    create(data: TemplatesDTO): Promise<Templates | import("@nestjs/common").BadRequestException>;
    delete(template: Templates): Promise<import("typeorm").DeleteResult>;
    update(template: Templates): Promise<string | object>;
}
