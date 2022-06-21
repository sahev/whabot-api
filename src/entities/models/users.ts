import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, IsNull} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    usr_user: number;

    @Column({nullable: true})
    usr_name: string;

    @Column({nullable: true})
    usr_email: string;

    @Column({nullable: true})
    usr_password: string;

}