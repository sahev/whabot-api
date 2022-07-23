import internal from "stream";
import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Documents {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    doc_document: number;

    @Column()
    doc_text: string;

    @Column()
    doc_language: string;

    @Column()
    doc_intent: string;

    @Column()
    doc_workflow: number;
    
}
