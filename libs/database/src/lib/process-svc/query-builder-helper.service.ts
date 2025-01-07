import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FinancialRoles } from '../constants';

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

  buildQueryForFinancialRole(financialRole: string, companyId: string, invoiceIds: string[]): Prisma.InvoiceWhereInput | null {
    let query: Prisma.InvoiceWhereInput | null = null;
    if (financialRole === FinancialRoles.CREDITOR) {
      query = { id: { in: invoiceIds }, creditorId: companyId };
    } else if (financialRole === FinancialRoles.DEBTOR) {
      query = { id: { in: invoiceIds }, debtorId: companyId };
    }
    return query;
  }
}
