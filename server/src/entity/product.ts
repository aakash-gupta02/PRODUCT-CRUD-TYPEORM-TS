import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("product1")
export class Products {

    @PrimaryGeneratedColumn()
    sku!: number;

    @Column()
    name!: string;

    @Column()
    price!: number;

    @Column()
    description!: string;

    @Column("text", { array: true })
    images!: string[];
}
