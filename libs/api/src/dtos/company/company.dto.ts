/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompanyAmqpDto, PaymentInformationAmqpDto } from '@ap3/amqp';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentInformationDto } from './payment-information.dto';

export class CompanyDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  countryCode: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  zip: string;
  @ApiProperty()
  vatId: string;
  @ApiProperty()
  commercialRegisterNumber: string;
  @ApiProperty({
    type: [PaymentInformationDto],
  })
  paymentInformation: PaymentInformationDto[];
  @ApiProperty()
  telephone: string | null;
  @ApiProperty()
  emailAddress: string | null;
  @ApiProperty()
  electronicAddress: string | null;
  @ApiProperty()
  electronicAddressSchemeId: string | null;

  public static fromAmqpDto(companyAmqp: CompanyAmqpDto): CompanyDto {
    return new CompanyDto(
      companyAmqp.id,
      companyAmqp.name,
      companyAmqp.city,
      companyAmqp.countryCode,
      companyAmqp.address,
      companyAmqp.zip,
      companyAmqp.vatId,
      companyAmqp.commercialRegisterNumber,
      companyAmqp.paymentInformation.map((dto: PaymentInformationAmqpDto) => PaymentInformationDto.fromAmqpDto(dto)),
      companyAmqp.telephone,
      companyAmqp.emailAddress,
      companyAmqp.electronicAddress,
      companyAmqp.electronicAddressSchemeId
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
    paymentInformation: PaymentInformationDto[],
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
