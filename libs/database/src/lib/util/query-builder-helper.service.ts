/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { FinancialRoles } from '@ap3/util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class QueryBuilderHelperService {
  buildRawQueryForFinancialRole(financialRole: string, companyId: string): Prisma.Sql {
    if (financialRole === FinancialRoles.DEBTOR) {
      return Prisma.sql`iv."debtorId" = ${companyId}`;
    } else if (financialRole === FinancialRoles.CREDITOR) {
      return Prisma.sql`iv."creditorId" = ${companyId}`;
    } else {
      throw new NotFoundException('Received no CreditorId/DebtorId');
    }
  }

  buildRawQueryForFilteredInvoiceIds(ids: string[]) {
    let query: Prisma.Sql;

    if (ids.length > 0) {
      query = Prisma.sql`iv."id" IN (${Prisma.join(ids)})`;
    } else {
      // Prevent creating prisma query for empty filter
      query = Prisma.sql`false`;
    }
    return query;
  }
}
