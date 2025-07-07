/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { parse } from 'csv-parse/sync';
import { Company, Machine, PaymentInformation, Prisma, Product } from '@prisma/client';
import { CsvParser, SeedFileNames } from './csv-parser';

export class MasterDataParser extends CsvParser {
  public static parseCompanies(): Company[] {
    const retVal: Company[] = parse(this.loadAndSanitizeFile(SeedFileNames.COMPANIES), {
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
    const retVal: Machine[] = parse(this.loadAndSanitizeFile(SeedFileNames.MACHINES), {
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

  public static parseNfts(): Machine[] {
    const retVal: Machine[] = parse(this.loadAndSanitizeFile(SeedFileNames.NFTS), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        if (context.column === 'id') {
          return Number(value);
        }
        if (context.column == 'createdOn' || context.column == 'lastUpdatedOn') {
          return !value || value === 'null' ? null : new Date(value);
        }
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'nft.seed.ts', `export const NftSeed = `);
    return retVal;
  }

  public static parsePaymentInformation(): PaymentInformation[] {
    const retVal: PaymentInformation[] = parse(this.loadAndSanitizeFile(SeedFileNames.PAYMENT_INFORMATION), {
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
    const retVal: Product[] = parse(this.loadAndSanitizeFile(SeedFileNames.PRODUCTS), {
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
