import { Repository } from 'typeorm';
import { LinksDTO } from './links.dto';
import { Links } from './links.entities';
export declare class LinksServices {
    private linksRepository;
    constructor(linksRepository: Repository<Links>);
    findAll(): Promise<Links[]>;
    newLink(data: Array<LinksDTO>, workflowId: any): Promise<(LinksDTO & Links)[]>;
    linksByWorkflow(workflow: any): Promise<Links[]>;
    deleteLink(id: LinksDTO): Promise<import("typeorm").DeleteResult>;
}
