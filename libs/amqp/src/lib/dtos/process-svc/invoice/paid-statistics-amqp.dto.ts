/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class PaidStatisticsAmqpDto {
  yearAndMonth: string;
  totalValuePaid: number;
  percentageOfPaidDue: number;

  constructor(yearAndMonth: string, totalValuePaidPerMonth: number, percentageOfPaidDuePerMonth: number) {
    this.yearAndMonth = yearAndMonth;
    this.totalValuePaid = totalValuePaidPerMonth;
    this.percentageOfPaidDue = percentageOfPaidDuePerMonth;
  }
}
