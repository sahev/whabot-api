import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Bots {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    bot_bot: number;

    @Column()
    bot_name: string;

    @Column({ default: false })
    bot_enabled: boolean;

    @Column()
    bot_user: string;

    @Column({ default: 'notLogged' })
    bot_status: string;

    @Column()
    bot_description: string;

    @Column({ nullable: true})
    bot_workflow: number;

    @Column()
    bot_type: number;

    @Column({ default: 'notLogged' })
    bot_lastStatus: string;
}

@Entity()
export class botMessagesDTO {
  mes_bot: number
  mes_body: string
  mes_expected: string
}