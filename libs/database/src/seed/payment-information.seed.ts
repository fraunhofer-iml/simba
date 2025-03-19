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
  {
    id: 'pi004',
    companyId: CompaniesSeed[3].id,
    IBAN: 'DE1645684242240000000004',
    BIC: 'BELADE04XXX',
  },
  {
    id: 'pi005',
    companyId: CompaniesSeed[4].id,
    IBAN: 'DE1645684242240000000005',
    BIC: 'BELADE05XXX',
  },
  {
    id: 'pi006',
    companyId: CompaniesSeed[5].id,
    IBAN: 'DE1645684242240000000006',
    BIC: 'BELADE06XXX',
  },
  {
    id: 'pi007',
    companyId: CompaniesSeed[6].id,
    IBAN: 'DE1645684242240000000007',
    BIC: 'BELADE07XXX',
  },
  {
    id: 'pi008',
    companyId: CompaniesSeed[7].id,
    IBAN: 'DE1645684242240000000008',
    BIC: 'BELADE08XXX',
  },
  {
    id: 'pi009',
    companyId: CompaniesSeed[8].id,
    IBAN: 'DE1645684242240000000009',
    BIC: 'BELADE09XXX',
  },
];
