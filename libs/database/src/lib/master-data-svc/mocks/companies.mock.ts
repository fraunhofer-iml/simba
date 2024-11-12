import { Company } from '@prisma/client';

export const companiesMock = <Company[]>[
  {
    id: 'cm349r6pw000408l8geee42b0',
    name: 'TestOneCompany GmbH',
    city: 'Dortmund',
    countryCode: 'DE',
    address: 'Joseph-von-Fraunhoferstraße 1',
    zip: '44',
    vatId: 'DE123456789',
    commercialRegisterNumber: 'HRB 1234',
    telephone: '0231 1234567',
    emailAddress: 'testOneCompany@gmail.com',
    electronicAddress: null,
    electronicAddressSchemeId: null,
  },
  {
    id: 'cm35m1g4u000008jo6jfwd6c4',
    name: 'TestTwoCompany GmbH',
    city: 'München',
    countryCode: 'DE',
    address: '',
    zip: '80',
    vatId: 'DE876543219',
    commercialRegisterNumber: 'HRB 4321',
    telephone: '089 7654321',
    emailAddress: 'testTwoCompany@gmail.com',
    electronicAddress: null,
    electronicAddressSchemeId: null,
  },
];
