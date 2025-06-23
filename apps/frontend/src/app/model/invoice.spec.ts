/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceDtoMocks } from '@ap3/api';
import { TranslateService } from '@ngx-translate/core';
import { Invoice } from './invoice';

describe('Invoice', () => {
  let translateServiceMock: Partial<TranslateService>;

  beforeEach(() => {
    translateServiceMock = {
      instant: jest.fn(),
      stream: jest.fn(),
    };
    (translateServiceMock.stream as jest.Mock).mockImplementation((key: string) => ({
      subscribe: (callback: (translation: string) => void) => {
        if (key === 'PaymentStatus.Paid') callback('Paid');
      },
    }));
  });

  it('should handle empty InvoiceDto', () => {
    const result = Invoice.convertToInvoice([]);
    expect(result).toEqual([]);
  });

  it('should format totalAmountWithoutVat to two decimal places with currency symbol', () => {
    const result = Invoice.convertToInvoice(InvoiceDtoMocks);
    expect(result[0].totalAmountWithoutVat).toBe('60.00');
  });
});
