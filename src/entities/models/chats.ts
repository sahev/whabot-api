import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Chats {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    cha_chat: number;

    @Column()
    cha_stage: string;

    @Column()
    cha_cart: string;

    @Column()
    cha_user: string
    
}