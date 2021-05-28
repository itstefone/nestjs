import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";
import { Role } from "./Role.entity";

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
     
    @ManyToMany(type => Role, role => role.users)
    @JoinTable({
        name: "user_role",
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'userId'
        },
        inverseJoinColumn: {
            name: 'id',
            referencedColumnName:'roleId'
        }
    })
    roles: Role[]


}