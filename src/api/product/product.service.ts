import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
    ) { }

    public async findAll(page:number,take:number) {
        var result = await this.productRepository.findAndCount({
                 take: take,
                 skip: (page-1) * take 
        })
        return result;
      }
      public async findById(id:number) {
        var result = await this.productRepository.findOne({
          where: { id:id }
        })
        return result;
      }
}