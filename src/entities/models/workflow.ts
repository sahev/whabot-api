import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Workflows {

    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    wor_workflow: number;

    @Column()
    wor_user: number;

    @Column()
    wor_bot: number;

    @Column()
    wor_stage: number;
    
    @Column()
    wor_cart: string

} 
