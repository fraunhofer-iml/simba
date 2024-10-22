import { ProductDto } from '@ap3/api';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    description: 'Get all available products.',
  })
  async findAll(): Promise<ProductDto[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get a product based on the corresponding product id.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the product.',
    required: true,
  })
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productsService.findOne(id);
  }
}
