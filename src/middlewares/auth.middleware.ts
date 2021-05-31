import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { JwtTokenDTO } from "src/dtos/users/jwt.token.dto";
import { UserService } from "src/services/user/user.service";
import {secretJWTKEY} from '../../config/auth.configuration';


@Injectable()
export class AuthMiddleware implements NestMiddleware {


    constructor(private readonly userService: UserService) {

    }
    
  async  use(req: Request, res: Response, next: NextFunction) {
        

    try {

  
        if(!req.headers.authorization) {

            throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
        }

        const token = req.headers.authorization;
        
        const tokenString = token.split(' ')[1];
        let jwtData = jwt.verify(tokenString, secretJWTKEY) as JwtTokenDTO;
        const ip = jwtData.ip.toString();


        if(ip !== jwtData.ip) {
            throw new HttpException('Bad token found ', HttpStatus.UNAUTHORIZED);
        }


        if(jwtData.userAgent !== req.headers['user-agent']) {
            throw new HttpException('Bad token found ', HttpStatus.UNAUTHORIZED);
        }

        const administrator = await this.userService.getById(jwtData.userId);


        if(!administrator) {
            throw new HttpException('Account not found ', HttpStatus.UNAUTHORIZED);
        }


        const currentTime = new Date().getTime() / 1000;


        if(currentTime >= jwtData.expire_at) {
            throw new HttpException('The token has expired', HttpStatus.UNAUTHORIZED);
        }
    } catch(e) {
        throw new HttpException('Bad token found ', HttpStatus.UNAUTHORIZED);
    }
        next();
    }

}