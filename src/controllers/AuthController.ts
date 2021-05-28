import { Body, Controller, Post,  Req } from "@nestjs/common";
import { LoginUsersDTO } from "src/dtos/users/login.users.dto";
import { CustomResponse } from "src/responses/CustomResponse";
import { UserService } from "src/services/user/user.service";
import {Request} from 'express';
 
@Controller('auth')
export class AuthController {



    constructor(private userService: UserService) {}
    @Post('login')
    login( @Body() data: LoginUsersDTO, @Req() request: Request) : Promise<CustomResponse> {
    
        console.log(request);
    
        return this.userService.login(data, request.ip, request.headers["user-agent"]);
    }
}