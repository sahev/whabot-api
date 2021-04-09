import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique} from "typeorm";

@Entity()
@Unique(['con_stage', 'con_wordkey']) 
export class Conditionals {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    con_conditional: number;

    @Column()
    con_stage: number;
    
    @Column()
    con_wordkey: string;

    @Column()
    con_response: string;

}