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
  {
    id: 'pt0004',
    name: 'SmartPay Solutions AG',
    city: 'Berlin',
    countryCode: 'DE',
    address: 'Friedrichstraße 88',
    zip: '10117',
    vatId: 'DE710345892',
    commercialRegisterNumber: 'HRB 8934',
    telephone: '030765432',
    emailAddress: 'contact@smartpay.de',
    electronicAddress: '54321098-0076-54',
    electronicAddressSchemeId: ''
  },
  {
    id: 'pt0005',
    name: 'FinTech Innovations GmbH',
    city: 'Stuttgart',
    countryCode: 'DE',
    address: 'Königstraße 27',
    zip: '70173',
    vatId: 'DE908765432',
    commercialRegisterNumber: 'HRB 6789',
    telephone: '0711987654',
    emailAddress: 'support@fintech-innovations.de',
    electronicAddress: '23456789-0012-89',
    electronicAddressSchemeId: ''
  },
  {
    id: 'pt0006',
    name: 'EcoTrade Solutions AG',
    city: 'Köln',
    countryCode: 'DE',
    address: 'Rheinpromenade 21',
    zip: '50678',
    vatId: 'DE567890123',
    commercialRegisterNumber: 'HRB 3456',
    telephone: '0221987654',
    emailAddress: 'info@ecotrade.de',
    electronicAddress: '45678912-0034-76',
    electronicAddressSchemeId: ''
  },
  {
    id: 'pt0007',
    name: 'AI Vision Technologies GmbH',
    city: 'Düsseldorf',
    countryCode: 'DE',
    address: 'Kaiserswerther Straße 45',
    zip: '40474',
    vatId: 'DE678901234',
    commercialRegisterNumber: 'HRB 7891',
    telephone: '0211898765',
    emailAddress: 'contact@ai-vision.de',
    electronicAddress: '78901234-0045-32',
    electronicAddressSchemeId: ''
  },
  {
    id: 'pt0008',
    name: 'Quantum Supply Chain AG',
    city: 'Leipzig',
    countryCode: 'DE',
    address: 'Augustusplatz 7',
    zip: '04109',
    vatId: 'DE789012345',
    commercialRegisterNumber: 'HRB 8902',
    telephone: '0341987654',
    emailAddress: 'info@quantum-sc.de',
    electronicAddress: '89012345-0023-67',
    electronicAddressSchemeId: ''
  },
  {
    id: 'pt0009',
    name: 'GreenEnergy Systems GmbH',
    city: 'Bremen',
    countryCode: 'DE',
    address: 'Am Wall 10',
    zip: '28195',
    vatId: 'DE890123456',
    commercialRegisterNumber: 'HRB 9012',
    telephone: '0421987654',
    emailAddress: 'info@greenenergy-systems.de',
    electronicAddress: '90123456-0056-43',
    electronicAddressSchemeId: ''
  },
];
