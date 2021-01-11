import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Messages {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    mes_message: number;

    @Column()
    mes_bot: string;

    @Column()
    mes_reply: string;

    @Column()
    mes_expected: string;

}