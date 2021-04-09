import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique} from "typeorm";

@Entity()
@Unique(['wor_name']) 
export class Workflows {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    wor_workflow: number;

    @Column()
    wor_name: string;
    
    @Column()
    wor_bot: number;

    @Column({ default: false })
    wor_enabled: boolean;

}