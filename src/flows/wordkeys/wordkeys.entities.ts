import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique} from "typeorm";

@Entity()
@Unique(['wok_stage', 'wok_word']) 
export class WordKeys {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    wok_wordkey: number;

    @Column()
    wok_stage: number;
    
    @Column()
    wok_word: string;

    @Column()
    wok_response: string;

}