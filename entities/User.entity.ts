import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.category";

@Entity()
export class User {
    @PrimaryGeneratedColumn({name:'id', type:'int', unsigned: true })
    userId:number;

    @Column({type:'varchar', length:"32", unique:true})
    username: string;

    @Column({name: "password", type:'varchar', length:'128'})
    passwordHash:string;


    @OneToMany(() => Product, product => product.user)
    products: Product[];
     


  
}