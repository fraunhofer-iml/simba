/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { parse } from 'csv-parse/sync';
import { MachineAssignment, Offer, Order, Prisma, ServiceProcess, ServiceStatus } from '@prisma/client';
import { CsvParser, SeedFileNames } from './csv-parser';

export class ProcessDataParser extends CsvParser {
  public static parseOffer(): Offer[] {
    const retVal: Offer[] = parse(this.loadAndSanitizeFile(SeedFileNames.OFFERS), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        if (context.column === 'plannedCalendarWeek' || context.column === 'plannedYear' || context.column === 'price') {
          return new Prisma.Decimal(value);
        } else if (context.column === 'creationDate' || context.column === 'decisionDate') {
          return !value || value === 'null' ? null : new Date(value);
        }
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'offers.seed.ts', `export const OffersSeed = `);
    return retVal;
  }

  public static parseOrders(): Order[] {
    const retVal: Order[] = parse(this.loadAndSanitizeFile(SeedFileNames.ORDERS), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        if (context.column === 'totalAmountWithoutVat') {
          return new Prisma.Decimal(value);
        } else if (context.column === 'documentIssueDate') {
          return !value || value === 'null' ? null : new Date(value);
        } else if (context.column === 'sumOfLinesAmount') {
          return !value || value === 'null' ? null : Number(value);
        }
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'orders.seed.ts', `export const OrdersSeed = `);
    return retVal;
  }

  public static parseOrderLines(): Order[] {
    const retVal: Order[] = parse(this.loadAndSanitizeFile(SeedFileNames.ORDER_LINES), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        if (context.column === 'netPrice' || context.column === 'requestedQuantity' || context.column === 'lineTotalAmount') {
          return new Prisma.Decimal(value);
        } else if (context.column === 'partialDeliveryAllowed') {
          return !value || value === 'null' ? null : Boolean(value);
        }
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'order-lines.seed.ts', `export const OrderLinesSeed = `);
    return retVal;
  }

  public static parseMachineAssignments(): MachineAssignment[] {
    const retVal: MachineAssignment[] = parse(this.loadAndSanitizeFile(SeedFileNames.MACHINE_ASSIGNMENTS), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        if (context.column === 'start' || context.column === 'end') {
          return !value || value === 'null' ? null : new Date(value);
        }
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'machine-assignments.seed.ts', `export const MachineAssignmentSeed = `);
    return retVal;
  }

  public static parseServiceStates(): ServiceStatus[] {
    const retVal: ServiceStatus[] = parse(this.loadAndSanitizeFile(SeedFileNames.SERVICE_PROCESS_STATES), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        if (context.column === 'timestamp') {
          return !value || value === 'null' ? null : new Date(value);
        }
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'service-process-states.seed.ts', `export const ServiceStatesSeed = `);
    return retVal;
  }

  public static parseServiceProcesses(): ServiceProcess[] {
    const retVal: ServiceProcess[] = parse(this.loadAndSanitizeFile(SeedFileNames.SERVICE_PROCESSES), {
      delimiter: ',',
      columns: true,
      cast: (value, context) => {
        if (context.column === 'scheduledDate') {
          return !value || value === 'null' ? null : new Date(value);
        } else if (context.column === 'dueCalendarWeek' || context.column === 'dueYear') {
          return !value || value === 'null' ? null : Number(value);
        }
        return value === 'null' ? null : value;
      },
    });
    this.evaluate(retVal, 'service-process.seed.ts', `export const ServiceProcessesSeed = `);
    return retVal;
  }
}
