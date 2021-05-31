import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "entities/Product.entity";
import { Repository } from "typeorm";


@Injectable()
export class ProductsService {


    constructor(@InjectRepository(Product) private readonly productService: Repository<Product>){
    }





   async getById(id: number): Promise<Product> {

        return   this.productService.findOne({
            productId: id
        })
    }
}