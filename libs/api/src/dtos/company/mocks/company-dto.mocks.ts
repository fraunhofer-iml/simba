/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { companiesSeed } from '@ap3/database';
import { CompanyDto } from '../company.dto';
import { paymentInformationDtoMocks } from './payment-information-dto.mocks';

export const companyDtoMock: CompanyDto[] = [
  new CompanyDto(
    companiesSeed[0].id,
    companiesSeed[0].name,
    companiesSeed[0].city,
    companiesSeed[0].countryCode,
    companiesSeed[0].address,
    companiesSeed[0].zip,
    companiesSeed[0].vatId,
    companiesSeed[0].commercialRegisterNumber,
    [paymentInformationDtoMocks[0]],
    companiesSeed[0].telephone,
    companiesSeed[0].emailAddress,
    companiesSeed[0].electronicAddress,
    companiesSeed[0].electronicAddressSchemeId
  ),
  new CompanyDto(
    companiesSeed[1].id,
    companiesSeed[1].name,
    companiesSeed[1].city,
    companiesSeed[1].countryCode,
    companiesSeed[1].address,
    companiesSeed[1].zip,
    companiesSeed[1].vatId,
    companiesSeed[1].commercialRegisterNumber,
    [paymentInformationDtoMocks[1]],
    companiesSeed[1].telephone,
    companiesSeed[1].emailAddress,
    companiesSeed[1].electronicAddress,
    companiesSeed[1].electronicAddressSchemeId
  ),
  new CompanyDto(
    companiesSeed[2].id,
    companiesSeed[2].name,
    companiesSeed[2].city,
    companiesSeed[2].countryCode,
    companiesSeed[2].address,
    companiesSeed[2].zip,
    companiesSeed[2].vatId,
    companiesSeed[2].commercialRegisterNumber,
    [paymentInformationDtoMocks[2]],
    companiesSeed[2].telephone,
    companiesSeed[2].emailAddress,
    companiesSeed[2].electronicAddress,
    companiesSeed[2].electronicAddressSchemeId
  ),
];
