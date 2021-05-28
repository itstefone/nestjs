import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { User } from "entities/User.entity";
import { AddUserDto } from "src/dtos/users/add.users.dto";
import { EditUserDto } from "src/dtos/users/edit.users.dto";
import { UserService } from "src/services/user/user.service";



@Controller('api/users')
export class UsersController {
    constructor(private userRepository: UserService) {}

    @Get()
    getAllUsers(): Promise<User[]> {
      return this.userRepository.getAll();
    }


    @Get(':id')
    getUserByid(@Param('id') userId: number) : Promise<User> {
      return this.userRepository.getById(userId); 
    }

    @Put()
    addUser(@Body() data: AddUserDto) {
      console.log(data);
      return this.userRepository.addUser(data);
    }


    @Post(':id')
    editUser(@Param('id') userId, @Body() data: EditUserDto) {
      return this.userRepository.editUserById(userId, data);
    }
    
    
}