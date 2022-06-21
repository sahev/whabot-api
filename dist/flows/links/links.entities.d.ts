declare class LinksConnections {
    id: number;
    position: string;
}
export declare class Links {
    id: number;
    destination: LinksConnections;
    source: LinksConnections;
    type: string;
    workflow: number;
}
export {};
