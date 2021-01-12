import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";

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
    
}