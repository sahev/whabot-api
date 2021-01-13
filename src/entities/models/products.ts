import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, EntityRepository} from "typeorm";

@EntityRepository()
@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    pro_product: number;

    @Column()
    pro_name: string;

    @Column()
    pro_price: string;

}