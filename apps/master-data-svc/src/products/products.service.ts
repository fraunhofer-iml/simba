import {Injectable, Logger} from '@nestjs/common';
import {ProductPrismaService} from "@ap3/database";
import {ProductAmqpDto} from "@ap3/amqp";
import {Product} from "@prisma/client";

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);

  constructor(private readonly productPrismaService: ProductPrismaService) {
  }

  async findAll(): Promise<ProductAmqpDto[]> {
    this.logger.debug(`Return all products from database`);
    try{
      const productsDtos: ProductAmqpDto[] = [];
      const products: Product[] = await this.productPrismaService.getProducts();
      products.forEach((product) => {
        productsDtos.push(ProductAmqpDto.fromPrismaEntity(product));
      })
      return productsDtos;
    }catch (e){
      this.logger.error(e);
      throw e;
    }
  }

  async findOne(id: string): Promise<ProductAmqpDto> {
    this.logger.debug(`Return a #${id} product`);
    try{
      const product: Product = await this.productPrismaService.getProduct(id);
      return ProductAmqpDto.fromPrismaEntity(product);
    }catch (e){
      this.logger.error(e);
      throw e;
    }
  }
}
