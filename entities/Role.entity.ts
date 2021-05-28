import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";



@Entity('roles')

export class Role {

    @PrimaryGeneratedColumn({name: 'id', type: 'int', unsigned: true})
    roleId: number;

    @Column({name: "name", type:"varchar"})
    name: string;




    @ManyToMany(type => User, user => user.roles)
    @JoinTable({
        name: "user_role",
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'roleId'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName:'userId'
        }
    })
    users: User[]
}