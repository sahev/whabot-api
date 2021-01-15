import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Customers {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    cst_customer: number;

    @Column()
    cst_name: string;

    @Column()
    cst_fulladdress: boolean;
    
}
