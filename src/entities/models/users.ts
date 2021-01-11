import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    usr_user: number;

    @Column()
    usr_name: string;

    @Column()
    usr_email: string;

    @Column()
    usr_password: string;

}