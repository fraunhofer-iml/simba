/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */
import { parse } from 'csv-parse/sync';
import { Prisma } from '@prisma/client';
import { CsvParser, SeedFileNames } from './csv-parser';

export class RelationsParser extends CsvParser {
  public static parseServiceProcessRelations(): Prisma.ServiceProcessUpdateManyArgs[] {
    const relationIdTuples: { serviceProcessId: string; acceptedOfferId: string }[] = parse(
      this.loadAndSanitizeFile(SeedFileNames.SERVICE_PROCESS_RELATIONS),
      {
        delimiter: ',',
        columns: true,
      }
    );

    const retVal: Prisma.ServiceProcessUpdateManyArgs[] = [];
    for (const tuple of relationIdTuples) {
      retVal.push({ where: { id: tuple.serviceProcessId }, data: { acceptedOfferId: tuple.acceptedOfferId } });
    }

    this.evaluate(retVal, 'service-process-relations.seed.ts', `export const ServiceProcessesRelationSeed = `);
    return retVal;
  }
}
