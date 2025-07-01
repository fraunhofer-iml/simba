/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FilterService<T extends object> {
  filter: T;
  filterBehaviorSubject: BehaviorSubject<boolean>;
  constructor() {
    this.filter = <T>{};
    this.filterBehaviorSubject = new BehaviorSubject(false);
  }

  getFilter(): T {
    return this.filter;
  }

  getSubject(): BehaviorSubject<boolean> {
    return this.filterBehaviorSubject;
  }

  setFilter(newFilter: T): void {
    this.filter = newFilter;
    this.cleanupFilter();
    this.filterBehaviorSubject.next(true);
  }

  resetFilter() {
    this.filter = <T>{};
  }

  cleanupFilter() {
    if (this.filter) {
      for (const key in this.filter) {
        const value = this.filter[key];
        if ((Array.isArray(value) && value.length == 0) || (typeof value === 'string' && value.trim() === '') || !this.filter[key]) {
          delete this.filter[key];
        }
      }
    }
  }

  processFiltersToHttpParams<T>(filter?: T): HttpParams {
    let params = new HttpParams();
    if (filter) {
      for (const key in filter) {
        if (Array.isArray(filter[key as keyof T])) {
          for (const state of filter[key as keyof T] as Array<string>) {
            params = params.append(key, state);
          }
        } else {
          params = params.append(key, String(filter[key as keyof T]));
        }
      }
    }
    return params;
  }

  countSelectedFilterOptions(): number {
    let selectedOptions = 0;
    for (const option of Object.values(this.filter)) {
      if (option) {
        selectedOptions++;
      }
    }
    return selectedOptions;
  }
}
