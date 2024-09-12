import {Product} from "@prisma/client";

export class ProductAmqpDto{
  id: string;
  name: string;
  variant: string;

  public static fromPrismaEntity(product: Product): ProductAmqpDto{
    return <ProductAmqpDto>{
      id: product.id,
      name: product.name,
      variant: product.variant
    }
  }
}
