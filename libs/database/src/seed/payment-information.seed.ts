/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentInformation } from '@prisma/client';
import { CompaniesSeed } from './companies.seed';

export const PaymentInformationSeed = <PaymentInformation[]>[
  {
    id: 'pi001',
    companyId: CompaniesSeed[0].id,
    IBAN: 'DE1645684242240000000000',
    BIC: 'BELADEBEXXX',
  },
  {
    id: 'pi002',
    companyId: CompaniesSeed[1].id,
    IBAN: 'DE852587997913360000000000',
    BIC: 'BELADEBEXXX',
  },
  {
    id: 'pi003',
    companyId: CompaniesSeed[2].id,
    IBAN: 'DE437151193618770000000000',
    BIC: 'BELADEBEXXX',
  },
];
