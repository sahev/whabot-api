import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Responses {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    res_response: number;

    @Column()
    res_text: string;

    @Column()
    res_language: string;

    @Column()
    res_intent: string;
    
}
