import { ProductsSeed } from '@ap3/database';
import { ProductDto } from '../product.dto';

export const ProductDtoMocks: ProductDto[] = [
  {
    name: ProductsSeed[0].name,
    id: ProductsSeed[0].id,
  },
];
