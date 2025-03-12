/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Company } from '@prisma/client';

export const CompaniesSeed = <Company[]>[
  {
    id: 'pt0001',
    name: 'Test Company 01',
    city: 'Dortmund',
    countryCode: 'DE',
    address: 'Joseph-von-Fraunhofer-Straße 3',
    zip: '44227',
    vatId: 'DE5976717450',
    commercialRegisterNumber: 'HRA 5647',
    telephone: '089266460',
    emailAddress: 'info@zv.fraunhofer.de',
    electronicAddress: '85289711-0342-22',
    electronicAddressSchemeId: '',
  },
  {
    id: 'pt0002',
    name: 'Test Company 02',
    city: 'München',
    countryCode: 'DE',
    address: 'Hansastraße 27c',
    zip: '80686',
    vatId: 'DE395680713',
    commercialRegisterNumber: 'HRB 5648',
    telephone: '08912050',
    emailAddress: 'info@zv.fraunhofer.de',
    electronicAddress: '16066069-0001-81',
    electronicAddressSchemeId: '',
  },
  {
    id: 'pt0003',
    name: 'Test Company 03',
    city: 'Dublin',
    countryCode: 'EN',
    address: 'Moonavenue 3',
    zip: '43016',
    vatId: 'DE275650896',
    commercialRegisterNumber: 'HRA 5649',
    telephone: '491573571898',
    emailAddress: 'Starlight@gmbh.de',
    electronicAddress: '24086761-0013-79',
    electronicAddressSchemeId: '',
  },
];
