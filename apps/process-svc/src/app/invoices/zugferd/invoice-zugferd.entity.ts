/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class InvoiceZugferdEntity {
  additional: AdditionalZugferd;
  buyer: BuyerZugferd;
  invoice: InvoiceZugferd;
  items: ItemZugferd[];
  supplier: SupplierZugferd;

  constructor(
    additional: AdditionalZugferd,
    buyer: BuyerZugferd,
    invoice: InvoiceZugferd,
    items: ItemZugferd[],
    supplier: SupplierZugferd
  ) {
    this.additional = additional;
    this.buyer = buyer;
    this.invoice = invoice;
    this.items = items;
    this.supplier = supplier;
  }
}

export class AdditionalZugferd {
  paymentTerms: string;
  vat: number;
}

export class BuyerZugferd {
  addressCity: string;
  addressStreet: string;
  addressZip: string;
  legalIdentifier: string;
  name: string;
  countryCode: string;
}

export class InvoiceZugferd {
  machineIds: string;
  machineNames: string;
  contractReference: string;
  date: Date;
  reference: string;
  paymentDate: Date;
  totalAmountNet: number;
  totalAmountGross: number;
}

export class ItemZugferd {
  articleName: string;
  articleNumber: string;
  currency: string;
  quantity: number;
  totalAmountNet: number;
  totalAmountGross: number;
  unitPrice: number;
}

export class SupplierZugferd {
  addressCity: string;
  addressStreet: string;
  addressZip: string;
  email: string;
  iban: string;
  legalIdentifier: string;
  name: string;
  phone: string;
  taxIdentifier: string;
  tradeRegisterNumber: string;
  countryCode: string;
}
