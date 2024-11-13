import { PaymentInformation } from '@prisma/client';

export const PaymentInformationSeed = <PaymentInformation[]>[
  {
    id: 'pi001',
    companyId: 'pt0001',
    IBAN: 'DE68210501700012345678',
    BIC: 'BELADEBEXXX',
  },
  {
    id: 'pi002',
    companyId: 'pt0002',
    IBAN: 'DE68210501700012345678',
    BIC: 'BELADEBEXXX',
  },
  {
    id: 'pi003',
    companyId: 'pt0003',
    IBAN: 'DE68210501700012345678',
    BIC: 'BELADEBEXXX',
  },
];
