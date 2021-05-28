import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import {DatabaseConfiguration} from '../config/database.configuration';
import { User } from 'entities/User.entity';
import { UserService } from './services/user/user.service';
import { Product } from 'entities/Product.entity';
import { Category } from 'entities/Category.entity';
import { UsersController } from './controllers/api/UsersController';
import { Role } from 'entities/Role.entity';
import { AuthController } from './controllers/AuthController';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: DatabaseConfiguration.hostname,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.database,
      port: 3306,
      entities: [User, Product, Category, Role]
    }),
    TypeOrmModule.forFeature([User, Product, Category])
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [UserService],
})
export class AppModule {}
