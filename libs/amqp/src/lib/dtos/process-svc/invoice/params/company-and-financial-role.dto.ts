/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class CompanyAndFinancialRole {
  invoiceIds: string[];
  companyId: string;
  financialRole: string;

  constructor(invoiceIds: string[], companyId: string, financialRole: string) {
    this.invoiceIds = invoiceIds;
    this.companyId = companyId;
    this.financialRole = financialRole;
  }
}
