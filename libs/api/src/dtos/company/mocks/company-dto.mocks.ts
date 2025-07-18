/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompaniesSeed } from '@ap3/database';
import { CompanyDto } from '../company.dto';
import { PaymentInformationDtoMocks } from './payment-information-dto.mocks';

export const CompanyDtoMock: CompanyDto[] = [
  new CompanyDto(
    CompaniesSeed[0].id,
    CompaniesSeed[0].name,
    CompaniesSeed[0].city,
    CompaniesSeed[0].countryCode,
    CompaniesSeed[0].address,
    CompaniesSeed[0].zip,
    CompaniesSeed[0].vatId,
    CompaniesSeed[0].commercialRegisterNumber,
    [PaymentInformationDtoMocks[0]],
    CompaniesSeed[0].telephone,
    CompaniesSeed[0].emailAddress,
    CompaniesSeed[0].electronicAddress,
    CompaniesSeed[0].electronicAddressSchemeId
  ),
  new CompanyDto(
    CompaniesSeed[1].id,
    CompaniesSeed[1].name,
    CompaniesSeed[1].city,
    CompaniesSeed[1].countryCode,
    CompaniesSeed[1].address,
    CompaniesSeed[1].zip,
    CompaniesSeed[1].vatId,
    CompaniesSeed[1].commercialRegisterNumber,
    [PaymentInformationDtoMocks[1]],
    CompaniesSeed[1].telephone,
    CompaniesSeed[1].emailAddress,
    CompaniesSeed[1].electronicAddress,
    CompaniesSeed[1].electronicAddressSchemeId
  ),
  new CompanyDto(
    CompaniesSeed[2].id,
    CompaniesSeed[2].name,
    CompaniesSeed[2].city,
    CompaniesSeed[2].countryCode,
    CompaniesSeed[2].address,
    CompaniesSeed[2].zip,
    CompaniesSeed[2].vatId,
    CompaniesSeed[2].commercialRegisterNumber,
    [PaymentInformationDtoMocks[2]],
    CompaniesSeed[2].telephone,
    CompaniesSeed[2].emailAddress,
    CompaniesSeed[2].electronicAddress,
    CompaniesSeed[2].electronicAddressSchemeId
  ),
];
