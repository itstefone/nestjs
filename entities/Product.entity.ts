import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";



@Entity('products')

export class Product {

    @PrimaryGeneratedColumn({type:'int', unsigned: true, name:'id'})
    productId:number;



    @Column({type:'varchar', name:"name"})
    productName: string;

    @Column({type:'int', name:'price', unsigned:true})
    productPrice: number;


    @Column({type:'varchar'})
    description: string;


    @Column({type:'varchar', name:'image'})
    productImage:string;

    @Column({type:'int', unsigned: true, name:"category_id"})
    categoryId:number;

    @Column({type:'int', unsigned: true, name:"user_id"})
    userId:number;



    @ManyToOne(() => User, user => user.products)
    @JoinColumn({name: 'id', referencedColumnName: 'userId'})
    user: User;
    




}
