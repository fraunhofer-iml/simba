import { ConfigurationModule } from '@ap3/config';
import { Module } from '@nestjs/common';
import { CompaniesModule } from '../companies/companies.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ConfigurationModule, ProductsModule, CompaniesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
