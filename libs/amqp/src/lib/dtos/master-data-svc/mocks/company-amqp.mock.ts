import { PaymentInformationSeed } from '@ap3/database';
import { PaymentInformationAmqpDto } from '../company';
import { CompanyAmqpDto } from '../company/company-amqp.dto';

export const CompanyAmqpMock = <CompanyAmqpDto[]>[
  {
    id: 'pt0001',
    name: 'Test Participant 01',
    city: 'Dortmund',
    countryCode: 'DE',
    address: 'Teststraße 3',
    zip: '44227',
    vatId: '12/748/29384',
    commercialRegisterNumber: 'HRA 5647',
    paymentInformation: [
      new PaymentInformationAmqpDto(PaymentInformationSeed[0].id, PaymentInformationSeed[0].IBAN, PaymentInformationSeed[0].BIC),
    ],
    telephone: '',
    emailAddress: '',
    electronicAddress: '',
    electronicAddressSchemeId: '',
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
    paymentInformation: [
      new PaymentInformationAmqpDto(PaymentInformationSeed[1].id, PaymentInformationSeed[1].IBAN, PaymentInformationSeed[1].BIC),
    ],
    telephone: '',
    emailAddress: '',
    electronicAddress: '',
    electronicAddressSchemeId: '',
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
    paymentInformation: [
      new PaymentInformationAmqpDto(PaymentInformationSeed[2].id, PaymentInformationSeed[2].IBAN, PaymentInformationSeed[2].BIC),
    ],
    telephone: '',
    emailAddress: '',
    electronicAddress: '',
    electronicAddressSchemeId: '',
  },
];
