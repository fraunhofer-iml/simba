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
