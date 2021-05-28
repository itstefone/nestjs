import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/User.entity';
import { AddUserDto } from 'src/dtos/users/add.users.dto';
import { EditUserDto } from 'src/dtos/users/edit.users.dto';
import { JwtTokenDTO } from 'src/dtos/users/jwt.token.dto';
import { LoginUsersDTO } from 'src/dtos/users/login.users.dto';
import { CustomResponse } from 'src/responses/CustomResponse';
import { Repository } from 'typeorm';



import  * as jwt from 'jsonwebtoken';
import { secretJWTKEY } from 'config/auth.configuration';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>
    ) {}


    getAll(): Promise<User[]> {
        return this.user.find({relations: [
            'products'
        ]});
    }

    getById(id: number): Promise<User> {

        return this.user.findOne(id, {
            relations: [
                "products",
                "roles"
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



    async login(data: LoginUsersDTO, ipAddress:string, userAgent: string): Promise<CustomResponse> {

        let user = await this.user.findOne({
            username: data.username
        })

        if(!user) {
            return new CustomResponse('Invalid Username', 403);
        }
        const isValidPassword = await this.validPassword( data.password, user.passwordHash);

        if(!isValidPassword) {
            return new CustomResponse('Invalid Password', 403);
        }


        let jwtData = new JwtTokenDTO;


        jwtData.username = user.username;
        jwtData.userId = user.userId;
        jwtData.expire_at = Math.floor(Date.now() / 1000) + 86400 * 14;
        jwtData.ip = ipAddress;
        jwtData.userAgent = userAgent;
        

        let jwtToken = jwt.sign(jwtData.toPlainObject(), secretJWTKEY);


      


        return new CustomResponse('Successfully login', 200, jwtToken);

        


    } 




    protected  createHashedPassword(password:string):string {
        const bcrypt = require('bcrypt');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }


    protected validPassword(bodyPassword:string, hashPassword:string):boolean {
        const bcrypt = require('bcrypt');
            return bcrypt.compareSync(bodyPassword, hashPassword);
    }

}
