/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProductDto } from '@ap3/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../../../environments/environment';
import { ApiEndpoints } from '../../constants/endpoints';

@Injectable()
export class ProductService {
  constructor(private readonly httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<ProductDto[]>(`${BASE_URL}${ApiEndpoints.products.getAllProducts}`);
  }
}
