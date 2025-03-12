/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceAmqpDto } from '@ap3/amqp';
import { CurrenciesEnum } from '@ap3/util';
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  invoiceNumber: string;
  @ApiProperty()
  creditor: string;
  @ApiProperty()
  creditorId: string;
  @ApiProperty()
  totalAmountWithoutVat: number;
  @ApiProperty()
  invoiceDueDate: string;
  @ApiProperty()
  debtor: string;
  @ApiProperty()
  debtorId: string;
  @ApiProperty()
  paymentStatus: string;
  @ApiProperty()
  url: string;
  @ApiProperty({
    type: String,
    enum: CurrenciesEnum,
  })
  currency: string;

  constructor(
    id: string,
    invoiceNumber: string,
    creditorId: string,
    creditor: string,
    totalAmountWithoutVat: number,
    invoiceDueDate: string,
    debtorId: string,
    debtor: string,
    paymentStatus: string,
    url: string,
    currency: string
  ) {
    this.id = id;
    this.invoiceNumber = invoiceNumber;
    this.creditorId = creditorId;
    this.creditor = creditor;
    this.totalAmountWithoutVat = totalAmountWithoutVat;
    this.invoiceDueDate = invoiceDueDate;
    this.debtorId = debtorId;
    this.debtor = debtor;
    this.paymentStatus = paymentStatus;
    this.url = url;
    this.currency = currency;
  }

  public static toTradeReceivableDto(dto: InvoiceAmqpDto, creditor: string, debtor: string): InvoiceDto {
    return new InvoiceDto(
      dto.id,
      dto.invoiceNumber,
      dto.creditorId,
      creditor,
      dto.totalAmountWithoutVat,
      new Date(dto.invoiceDueDate).toISOString(),
      dto.debtorId,
      debtor,
      dto.status.status,
      dto.url,
      dto.currency
    );
  }
}
