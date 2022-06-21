import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn} from "typeorm";

@Entity()
export class CampaignHistory {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    cah_campaignhistory: number;

    @Column({nullable: true})
    cah_campaign: number;

    @Column({nullable: true})
    cah_bot: number;

    @Column({nullable: true})
    cah_to: string;

    @Column({default: false})
    cah_erro: boolean;

    @Column('text', {nullable: true})
    cah_message: string;

    @CreateDateColumn()
    cah_createdOn: Date;

    @Column({nullable: true})
    cah_messageerror: string;
}