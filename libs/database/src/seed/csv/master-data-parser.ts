/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { parse } from 'csv-parse/sync';
import { Company, Machine, PaymentInformation, Prisma, Product } from '@prisma/client';
import { CsvParser } from './csv-parser';

export class MasterDataParser extends CsvParser {
  public static parseCompanies(): Company[] {
    const retVal: Company[] = parse(this.sanitizeCsv(this.companiesFileContent), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'companies.seed.ts', `export const CompaniesSeed = `);
    return retVal;
  }

  public static parseMachines(): Machine[] {
    const retVal: Machine[] = parse(this.sanitizeCsv(this.machinesFileContent), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        if (context.column === 'minimalPrice') {
          return new Prisma.Decimal(value);
        }
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'machines.seed.ts', `export const MachinesSeed = `);
    return retVal;
  }

  public static parsePaymentInformation(): PaymentInformation[] {
    const retVal: PaymentInformation[] = parse(this.sanitizeCsv(this.paymentInformationFileContent), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'payment-information.seed.ts', `export const PaymentInformationSeed = `);
    return retVal;
  }

  public static parseProducts(): Product[] {
    const retVal: Product[] = parse(this.sanitizeCsv(this.productsFileContent), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'products.seed.ts', `export const ProductsSeed = `);
    return retVal;
  }
}
