/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceWithNFT } from '@ap3/database';
import { Invoice, PaymentStatus, TradeReceivable } from '@prisma/client';
import { PaymentStatusAmqpDto } from '../trade-receivable';

export class InvoiceAmqpDto {
  id: string;
  debtorId: string;
  creditorId: string;
  nft: string;
  totalAmountWithoutVat: number;
  status: PaymentStatusAmqpDto;
  invoiceNumber: string;
  invoiceDueDate: Date;
  url: string;
  currency: string;

  constructor(
    id: string,
    debtorId: string,
    creditorId: string,
    nft: string,
    totalAmountWithoutVat: number,
    status: PaymentStatusAmqpDto,
    invoiceNumber: string,
    invoiceDueDate: Date,
    url: string,
    currency: string
  ) {
    this.id = id;
    this.debtorId = debtorId;
    this.creditorId = creditorId;
    this.nft = nft;
    this.totalAmountWithoutVat = totalAmountWithoutVat;
    this.status = status;
    this.invoiceNumber = invoiceNumber;
    this.invoiceDueDate = invoiceDueDate;
    this.url = url;
    this.currency = currency;
  }

  public static fromPrismaEntity(invoice: InvoiceWithNFT, states: PaymentStatus[], fileServerUrl: string): InvoiceAmqpDto {
    const lastState = this.getLatestState(states);
    const currentState = lastState
      ? new PaymentStatusAmqpDto(lastState.status, lastState.timestamp)
      : new PaymentStatusAmqpDto('', new Date());

    return new InvoiceAmqpDto(
      invoice.id,
      invoice.debtorId ? invoice.debtorId : '',
      invoice.creditorId ? invoice.creditorId : '',
      invoice?.tradeReceivable?.nft ? invoice.tradeReceivable.nft : '',
      +invoice.totalAmountWithoutVat,
      currentState,
      invoice.invoiceNumber,
      invoice.dueDate,
      invoice.url ? fileServerUrl + invoice.url : '',
      invoice.contractCurrency
    );
  }

  public static fromTRPrismaEntity(
    tradeReceivable: TradeReceivable,
    invoice: Invoice,
    states: PaymentStatus[],
    fileServerUrl: string
  ): InvoiceAmqpDto {
    const lastState = this.getLatestState(states);
    const currentState = lastState
      ? new PaymentStatusAmqpDto(lastState.status, lastState.timestamp)
      : new PaymentStatusAmqpDto('', new Date());

    return new InvoiceAmqpDto(
      invoice.id,
      invoice.debtorId ? invoice.debtorId : '',
      invoice.creditorId ? invoice.creditorId : '',
      tradeReceivable?.nft,
      +invoice.totalAmountWithoutVat,
      currentState,
      invoice.invoiceNumber,
      invoice.dueDate,
      invoice.url ? fileServerUrl + invoice.url : '',
      invoice.contractCurrency
    );
  }

  private static getLatestState(states: PaymentStatus[]): PaymentStatus | null {
    let retVal: PaymentStatus | null = null;
    if (states && states.length > 0) {
      retVal = states.reduce((latest, current) => {
        return current.timestamp > latest.timestamp ? current : latest;
      });
    }
    return retVal;
  }
}
