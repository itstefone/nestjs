import { Controller, Get, Param } from "@nestjs/common";
import { Product } from "entities/Product.entity";
import { ProductsService } from "src/services/products/products.service";





@Controller('api/products')
export class ProductsController {



    constructor(private readonly productSerivce: ProductsService) {

    }

    @Get(':productId')
    getProduct(@Param('productId') id: number): Promise<Product> {
        return this.productSerivce.getById(id);
    }

}