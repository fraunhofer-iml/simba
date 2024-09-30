import { ProductDto } from '@ap3/api';
import { environment } from 'apps/frontend/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<ProductDto[]>(environment.PRODUCTS.URL);
  }
}
