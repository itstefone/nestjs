import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/User.entity';
import { AddUserDto } from 'src/dtos/users/add.users.dto';
import { EditUserDto } from 'src/dtos/users/edit.users.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>
    ) {}


    getAll(): Promise<User[]> {
        return this.user.find();
    }

    getById(id: number): Promise<User> {

        return this.user.findOne(id, {
            relations: [
                "products"
            ]
        });
    }


    addUser(data: AddUserDto): Promise<User> {
        
       
        let newUser = new User();
        newUser.username = data.username;
        newUser.passwordHash = this.createHashedPassword(data.password);

        return this.user.save(newUser);
    }


    async editUserById(id: number, {username, password}: EditUserDto): Promise<User> {

        const user = await this.user.findOne(id);
        user.username = username;
        user.passwordHash = this.createHashedPassword(password);
        return this.user.save(user);
    }




    protected  createHashedPassword(password:string):string {
        const bcrypt = require('bcrypt');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        return hash;
    }

}
