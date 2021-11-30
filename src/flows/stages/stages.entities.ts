import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique} from "typeorm";

@Entity()
@Unique(['type', 'workflow']) 
export class Stages {

    @Column()
    @PrimaryColumn()
    id: number;

    @Column()
    type: string;
    
    @Column()
    label: string;
    
    @Column()
    workflow: number;

    @Column()
    x: number;

    @Column()
    y: number;

}