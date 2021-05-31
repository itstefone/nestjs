import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ProductsController } from './controllers/api/ProductsController';
import { ProductsService } from './services/products/products.service';

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
  controllers: [AppController, UsersController, AuthController, ProductsController],
  providers: [UserService, ProductsService],
  exports: [UserService, ProductsService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware)
              .exclude('auth/*').
              forRoutes('api/*')
  }
}
