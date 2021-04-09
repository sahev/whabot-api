import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique} from "typeorm";

@Entity()
@Unique(['sta_name', 'sta_workflow']) 
export class Stages {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    sta_stage: number;

    @Column()
    sta_name: string;
    
    @Column()
    sta_workflow: number;

    @Column({ default: true })
    sta_enabled: boolean;

}