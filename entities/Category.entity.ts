import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn({type:'int', unsigned: true})
    id:number;


    @Column({type:"varchar", name:"name"})
    categoryName:number;

    


}

