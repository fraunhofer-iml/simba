import { Module } from '@nestjs/common';

import {ConfigurationModule} from "@ap3/config";
import {ProductsModule} from "../products/products.module";

@Module({
  imports: [ConfigurationModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
