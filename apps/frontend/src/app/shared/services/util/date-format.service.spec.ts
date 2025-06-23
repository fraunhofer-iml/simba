/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { FormatService } from './format.service';

describe('DateFormatService', () => {
  let service: FormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TranslateModule.forRoot()], providers: [FormatService, DatePipe, TranslateService] });
    service = TestBed.inject(FormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
