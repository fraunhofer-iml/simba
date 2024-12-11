import { ProductDto } from '@ap3/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { ApiEndpoints } from '../endpoints/endpoints';

@Injectable()
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<ProductDto[]>(`${BASE_URL}${ApiEndpoints.products.getAllProducts}`);
  }
}
