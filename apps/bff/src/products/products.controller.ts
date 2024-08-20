import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from '@ap3/api';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    description: 'Get all available products.'
  })
  findAll(): ProductDto[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get a product based on the corresponding product id.'
  })
  findOne(@Param('id') id: string): ProductDto {
    return this.productsService.findOne(+id);
  }
}
