import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Long } from "typeorm";

@Entity()
export class Templates {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    tem_template: number;

    @Column()
    tem_name: string;

    @Column('text')
    tem_message: string;

}