/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { parse } from 'csv-parse/sync';
import { Invoice, PaymentStatus, Prisma, TradeReceivable } from '@prisma/client';
import { CsvParser } from './csv-parser';

export class FinanceDataParser extends CsvParser {
  public static parseInvoices(): Invoice[] {
    const retVal: Invoice[] = parse(this.sanitizeCsv(this.invoicesFileContent), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        if (context.column === 'totalAmountWithoutVat' || context.column === 'vat') {
          return new Prisma.Decimal(value);
        } else if (context.column === 'creationDate' || context.column === 'dueDate') {
          return !value || value === 'null' ? null : new Date(value);
        }
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'invoices.seed.ts', `export const InvoiceSeed = `);
    return retVal;
  }

  public static parsePaymentStates(): PaymentStatus[] {
    const retVal: PaymentStatus[] = parse(this.sanitizeCsv(this.paymentStatesFileContent), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        if (context.column === 'timestamp') {
          return !value || value === 'null' ? null : new Date(value);
        }
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'payment-states.seed.ts', `export const PaymentStatesSeed = `);
    return retVal;
  }

  public static parseTradeReceivables(): TradeReceivable[] {
    const retVal: TradeReceivable[] = parse(this.sanitizeCsv(this.tradeReceivablesFileContent), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'trade-receivables.seed.ts', `export const TradeReceivablesSeed = `);
    return retVal;
  }
}
