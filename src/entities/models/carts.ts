import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne} from "typeorm";
import { Products } from './products'

@Entity()
export class Carts {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    car_cart: number;

    @ManyToOne(() => Products, (products) => products.pro_product)
    @Column()
    public car_product: number;

    @Column()
    car_user: string;
    
}