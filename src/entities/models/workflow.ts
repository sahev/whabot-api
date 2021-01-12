import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Workflow {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    wor_workflow: number;

    @Column()
    wor_name: string;

    @Column()
    wor_type: string;

    @Column()
    wor_message: string;

} 
