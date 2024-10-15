import {Product} from "@prisma/client";

export class ProductAmqpDto{
  id: string;
  name: string;
  variant: string;

  constructor(id: string, name: string, variant: string) {
    this.id = id;
    this.name = name;
    this.variant = variant;
  }

  public static fromPrismaEntity(product: Product): ProductAmqpDto{
    return <ProductAmqpDto>{
      id: product.id,
      name: product.name,
      variant: product.variant
    }
  }
}
