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

    @Column({default: null})
    mes_options: string;

    @Column()
    mes_type: string;

    @Column({default: null})
    mes_shortcut: string;

}