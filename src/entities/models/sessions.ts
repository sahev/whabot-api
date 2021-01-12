import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Sessions {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    ses_session: number;

    @Column()
    ses_data: string;

    @Column()
    ses_customer: string;

}
