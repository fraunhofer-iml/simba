/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompanyWithPaymentModalitiesTypes } from '@ap3/database';
import { PaymentInformationAmqpDto } from './payment-information-amqp.dto';

export class CompanyAmqpDto {
  id: string;
  name: string;
  city: string;
  countryCode: string;
  address: string;
  zip: string;
  vatId: string;
  commercialRegisterNumber: string;
  paymentInformation: PaymentInformationAmqpDto[];
  telephone: string | null;
  emailAddress: string | null;
  electronicAddress: string | null;
  electronicAddressSchemeId: string | null;

  public static fromEntity(company: CompanyWithPaymentModalitiesTypes): CompanyAmqpDto {
    const paymentInformationAMQP: PaymentInformationAmqpDto[] = [];
    if (company.paymentInformation && company.paymentInformation.length > 0) {
      for (const paymentInformation of company.paymentInformation) {
        paymentInformationAMQP.push(new PaymentInformationAmqpDto(paymentInformation.id, paymentInformation.IBAN, paymentInformation.BIC));
      }
    }
    return new CompanyAmqpDto(
      company.id,
      company.name,
      company.city,
      company.countryCode,
      company.address,
      company.zip,
      company.vatId,
      company.commercialRegisterNumber,
      paymentInformationAMQP,
      company.telephone,
      company.emailAddress,
      company.electronicAddress,
      company.electronicAddressSchemeId
    );
  }

  constructor(
    id: string,
    name: string,
    city: string,
    countryCode: string,
    address: string,
    zip: string,
    vatId: string,
    commercialRegisterNumber: string,
    paymentInformation: PaymentInformationAmqpDto[],
    telephone: string | null,
    emailAddress: string | null,
    electronicAddress: string | null,
    electronicAddressSchemeId: string | null
  ) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.countryCode = countryCode;
    this.address = address;
    this.zip = zip;
    this.vatId = vatId;
    this.commercialRegisterNumber = commercialRegisterNumber;
    this.paymentInformation = paymentInformation;
    this.telephone = telephone;
    this.emailAddress = emailAddress;
    this.electronicAddress = electronicAddress;
    this.electronicAddressSchemeId = electronicAddressSchemeId;
  }
}
