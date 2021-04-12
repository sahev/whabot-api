import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique} from "typeorm";

@Entity()
export class Chats {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    cha_chat: number;

    @Column()
    cha_stage: number;
    
    @Column()
    cha_message: string;

    @Column()
    cha_chatId: string;

    @Column()
    cha_bot: number;

}