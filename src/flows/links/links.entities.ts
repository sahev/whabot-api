import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique} from "typeorm";

@Entity()
export class Links {

    @PrimaryColumn()
    id: number

    @Column()
    from: number
    
    @Column()
    to: number

}