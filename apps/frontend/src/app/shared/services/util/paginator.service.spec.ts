/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TestBed } from '@angular/core/testing';
import { PaginatorService } from './paginator.service';
import { Subject } from 'rxjs';

describe('PaginatorService', () => {
  let service: PaginatorService;
  let translateMock: any;

  beforeEach(() => {
    translateMock = {
      instant: jest.fn((key: string) => `translated(${key})`),
      onLangChange: new Subject(),
    };

    TestBed.configureTestingModule({ imports: [TranslateModule.forRoot()], providers: [TranslateService, PaginatorService] });
    service = new PaginatorService(translateMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct range label text', () => {
    const result = service.getRangeLabel(1, 10, 20);
    expect(result).toBe('11–20 translated(Paginator.Of) 20');
  });
});
