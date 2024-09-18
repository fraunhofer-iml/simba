import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDto } from '@ap3/api';
import { environment } from 'apps/frontend/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  getProducts(){
    return this.httpClient.get<ProductDto[]>(environment.PRODUCTS.URL);
  }
}