import { Company } from '@prisma/client';

export const CompaniesSeed = <Company[]>[
  {
    id: 'pt0001',
    name: 'Test Participant 01',
    city: 'Dortmund',
    countryCode: 'DE',
    address: 'Teststraße 3',
    zip: '44227',
    vatId: '12/748/29384',
    commercialRegisterNumber: 'HRA 5647',
  },
  {
    id: 'pt0002',
    name: 'Test Participant 2',
    city: 'Dortmund',
    countryCode: 'DE',
    address: 'Teststraße 3',
    zip: '44227',
    vatId: '12/748/29584',
    commercialRegisterNumber: 'HRA 5648',
  },
  {
    id: 'pt0003',
    name: 'Test Participant 3',
    city: 'Dortmund',
    countryCode: 'DE',
    address: 'Teststraße 3',
    zip: '44227',
    vatId: '12/748/29484',
    commercialRegisterNumber: 'HRA 5649',
  },
];
