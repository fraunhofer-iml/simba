/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { companiesSeed, paymentInformationSeed } from '@ap3/database';
import { CompanyAmqpDto } from '../company-amqp.dto';
import { PaymentInformationAmqpDto } from '../index';

export const companyAmqpMock = <CompanyAmqpDto[]>[
  new CompanyAmqpDto(
    companiesSeed[0].id,
    companiesSeed[0].name,
    companiesSeed[0].city,
    companiesSeed[0].countryCode,
    companiesSeed[0].address,
    companiesSeed[0].zip,
    companiesSeed[0].vatId,
    companiesSeed[0].commercialRegisterNumber,
    [new PaymentInformationAmqpDto(paymentInformationSeed[0].id, paymentInformationSeed[0].IBAN, paymentInformationSeed[0].BIC)],
    companiesSeed[0].telephone,
    companiesSeed[0].emailAddress,
    companiesSeed[0].electronicAddress,
    companiesSeed[0].electronicAddressSchemeId
  ),
  new CompanyAmqpDto(
    companiesSeed[1].id,
    companiesSeed[1].name,
    companiesSeed[1].city,
    companiesSeed[1].countryCode,
    companiesSeed[1].address,
    companiesSeed[1].zip,
    companiesSeed[1].vatId,
    companiesSeed[1].commercialRegisterNumber,
    [new PaymentInformationAmqpDto(paymentInformationSeed[1].id, paymentInformationSeed[1].IBAN, paymentInformationSeed[1].BIC)],
    companiesSeed[1].telephone,
    companiesSeed[1].emailAddress,
    companiesSeed[1].electronicAddress,
    companiesSeed[1].electronicAddressSchemeId
  ),
  new CompanyAmqpDto(
    companiesSeed[2].id,
    companiesSeed[2].name,
    companiesSeed[2].city,
    companiesSeed[2].countryCode,
    companiesSeed[2].address,
    companiesSeed[2].zip,
    companiesSeed[2].vatId,
    companiesSeed[2].commercialRegisterNumber,
    [new PaymentInformationAmqpDto(paymentInformationSeed[2].id, paymentInformationSeed[2].IBAN, paymentInformationSeed[2].BIC)],
    companiesSeed[2].telephone,
    companiesSeed[2].emailAddress,
    companiesSeed[2].electronicAddress,
    companiesSeed[2].electronicAddressSchemeId
  ),
];
