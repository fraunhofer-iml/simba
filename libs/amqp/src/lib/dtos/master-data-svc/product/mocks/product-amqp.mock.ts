import { ProductsSeed } from '@ap3/database';
import { ProductAmqpDto } from '../product-amqp.dto';

export const ProductAmqpMock = <ProductAmqpDto[]>[{ id: ProductsSeed[0].id, name: ProductsSeed[0].name, variant: ProductsSeed[0].variant }];
