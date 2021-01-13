import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Messages {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    mes_message: number;

    @Column()
    mes_bot: number;

    @Column()
    mes_body: string;

    @Column()
    mes_stage: number;

    @Column()
    mes_type: string;

}