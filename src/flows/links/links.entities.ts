import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique} from "typeorm";

class LinksConnections {
    id: number;
    position: string;
}

@Entity()
export class Links {

    @PrimaryColumn()
    id: number

    @Column({ type: 'json' })
    destination: LinksConnections
    
    @Column({ type: 'json' })
    source: LinksConnections

    @Column()
    type: string

    @Column()
    workflow: number
}

