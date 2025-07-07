/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as util from 'node:util';
import { cloneDeep } from 'lodash';
import { Prisma } from '@prisma/client';
import { DateSerializer } from './TypedSerializer/date.serializer';
import { DecimalSerializer } from './TypedSerializer/decimal.serializer';

export enum SeedFileNames {
  INVOICES = 'invoices.seed.csv',
  COMPANIES = 'companies.seed.csv',
  MACHINE_ASSIGNMENTS = 'machine-assignments.seed.csv',
  MACHINES = 'machines.seed.csv',
  NFTS = 'nft.seed.csv',
  OFFERS = 'offers.seed.csv',
  ORDER_LINES = 'order-lines.seed.csv',
  ORDERS = 'orders.seed.csv',
  PAYMENT_INFORMATION = 'payment-information.seed.csv',
  PAYMENT_STATES = 'payment-states.seed.csv',
  PRODUCTS = 'products.seed.csv',
  SERVICE_PROCESSES = 'service-processes.seed.csv',
  SERVICE_PROCESS_STATES = 'service-process-states.seed.csv',
  SERVICE_PROCESS_RELATIONS = 'service-process-relations.seed.csv',
  TRADE_RECEIVABLES = 'trade-receivables.seed.csv',
}
export abstract class CsvParser {
  protected static prismaImport = `import { Prisma } from '@prisma/client';`;
  private static folder = 'libs/database/src/seed/csv/data';

  protected static loadAndSanitizeFile(fileName: string): string {
    try {
      const fileContent = fs.readFileSync(path.resolve(process.cwd(), this.folder, fileName), {
        encoding: 'utf-8',
      });
      return this.sanitizeCsv(fileContent);
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  private static sanitizeCsv(content: string): string {
    content.replace(/^\ufeff/, '');
    content.trim();
    return content;
  }

  protected static evaluate(seedObjects: any[], tsFileName: string, tsFileDeclaration: string): void {
    if (seedObjects && seedObjects.length > 0) {
      try {
        const seedObjectsCopy = cloneDeep(seedObjects);
        const filePath = path.resolve(this.folder, `../../${tsFileName}`);
        for (const obj of seedObjectsCopy) {
          Object.entries(obj).forEach(([key, value]) => {
            if (value instanceof Date) obj[key] = new DateSerializer(value);
            if (value instanceof Prisma.Decimal) {
              if (!tsFileDeclaration.includes(this.prismaImport)) {
                tsFileDeclaration = `${this.prismaImport} \n ${tsFileDeclaration}`;
              }
              obj[key] = new DecimalSerializer(value);
            }
          });
        }
        const sanitizedString = util.inspect(seedObjectsCopy, { depth: Infinity, maxArrayLength: Infinity });
        fs.writeFileSync(filePath, tsFileDeclaration + sanitizedString, { encoding: 'utf-8', flag: 'w' });
      } catch (e) {
        console.error(e);
      }
    } else {
      throw Error(`Couldn't read seed data for ${tsFileName}`);
    }
  }
}
