import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from "typeorm";

@Entity()
export class Carts {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    car_cart: number;

    @Column()
    car_items: string;

    @Column()
    car_user: number;
    
}