/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginatorService extends MatPaginatorIntl {
  constructor(private readonly translateService: TranslateService) {
    super();
    this.loadTranslation();
    this.translateService.onLangChange.subscribe(() => this.loadTranslation());
  }
  private loadTranslation() {
    this.itemsPerPageLabel = this.translateService.instant('Paginator.ItemsPerPage');
    this.changes.next();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return `${start}–${end} ${this.translateService.instant('Paginator.Of')} ${length}`;
  };
}
