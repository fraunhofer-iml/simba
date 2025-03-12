/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class TRParamsCompanyIdAndYearAndFinancialRole {
  companyId: string;
  year: number;
  financialRole: string;

  constructor(companyId: string, year: number, financialRole: string) {
    this.companyId = companyId;
    this.year = year;
    this.financialRole = financialRole;
  }
}
