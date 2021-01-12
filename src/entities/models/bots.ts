import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Bots {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    bot_bot: number;

    @Column()
    bot_name: string;

    @Column()
    bot_enabled: boolean;

    @Column()
    bot_user: string;

    @Column({ default: 'notLogged' })
    bot_status: string;
    
}