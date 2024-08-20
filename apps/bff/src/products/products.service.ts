import { Injectable } from '@nestjs/common';
import { ProductDto, ProductMocks } from '@ap3/api';

@Injectable()
export class ProductsService {
  findAll(): ProductDto[] {
    return ProductMocks;
  }

  findOne(id: number): ProductDto {
    return ProductMocks[0];
  }
}
