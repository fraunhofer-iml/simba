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

export abstract class CsvParser {
  protected static prismaImport = `import { Prisma } from '@prisma/client';`;
  private static folder = 'libs/database/src/seed/csv/data';
  protected static companiesFileContent = this.loadFile('companies.seed.csv');
  protected static invoicesFileContent = this.loadFile('invoices.seed.csv');
  protected static machineAssignmentsFileContent = this.loadFile('machine-assignments.seed.csv');
  protected static machinesFileContent = this.loadFile('machines.seed.csv');
  protected static offersFileContent = this.loadFile('offers.seed.csv');
  protected static orderLinesFileContent = this.loadFile('order-lines.seed.csv');
  protected static ordersFileContent = this.loadFile('orders.seed.csv');
  protected static paymentInformationFileContent = this.loadFile('payment-information.seed.csv');
  protected static paymentStatesFileContent = this.loadFile('payment-states.seed.csv');
  protected static productsFileContent = this.loadFile('products.seed.csv');
  protected static serviceProcessesFileContent = this.loadFile('service-processes.seed.csv');
  protected static serviceProcessStatesFileContent = this.loadFile('service-process-states.seed.csv');
  protected static serviceProcessRelationsFileContent = this.loadFile('service-process-relations.seed.csv');
  protected static tradeReceivablesFileContent = this.loadFile('trade-receivables.seed.csv');

  protected static loadFile(fileName: string): string {
    try {
      return fs.readFileSync(path.resolve(process.cwd(), this.folder, fileName), {
        encoding: 'utf-8',
      });
    } catch (e) {
      console.error(e);
      return '';
    }
  }

  protected static sanitizeCsv(content: string) {
    content.replace(/^\ufeff/, '');
    content.trim();
    return content;
  }

  protected static evaluate(seedObjects: any[], tsFileName: string, tsFileDeclaration: string) {
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
