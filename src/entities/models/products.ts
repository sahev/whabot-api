import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, EntityRepository, OneToMany} from "typeorm";
import { Carts } from "..";

@EntityRepository()
@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    @OneToMany(() => Carts, (cart) => cart.car_product)
    public pro_product: number;

    @Column()
    public pro_name: string;

    @Column("decimal", { precision: 10, scale: 2 })
    public pro_price: number;

}