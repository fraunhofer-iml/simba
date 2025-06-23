/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStates } from '@ap3/util';

export class AllInvoicesFilterAmqpDto {
  paymentStates?: PaymentStates[];
  creditorId?: string;
  debtorId?: string;
  invoiceNumber?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  orderNumber?: string[];

  constructor(
    paymentStates?: PaymentStates[] | string,
    creditorId?: string,
    debtorId?: string,
    invoiceNumber?: string,
    dueDateFrom?: Date,
    dueDateTo?: Date,
    orderNumber?: string[]
  ) {
    if (typeof paymentStates === 'string') {
      this.paymentStates = this.parsePaymentStates(paymentStates);
    } else {
      this.paymentStates = paymentStates;
    }
    this.creditorId = creditorId;
    this.debtorId = debtorId;
    this.invoiceNumber = invoiceNumber;
    this.dueDateFrom = dueDateFrom;
    this.dueDateTo = dueDateTo;
    this.orderNumber = orderNumber;
  }

  private parsePaymentStates(paymentStates: string) {
    try {
      return <PaymentStates[]>JSON.parse(paymentStates);
    } catch (e) {
      throw new Error('Parsing of PaymentStates not possible');
    }
  }
}
