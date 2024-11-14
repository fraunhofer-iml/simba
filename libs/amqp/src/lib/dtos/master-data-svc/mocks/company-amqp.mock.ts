import { PaymentInformationSeed } from '@ap3/database';
import { PaymentInformationAmqpDto } from '../company';
import { CompanyAmqpDto } from '../company/company-amqp.dto';

export const CompanyAmqpMock = <CompanyAmqpDto[]>[
  new CompanyAmqpDto(
    'pt0001',
    'Test Participant 01',
    'Dortmund',
    'DE',
    'Teststraße 3',
    '44227',
    '12/748/29384',
    'HRA 5647',
    [new PaymentInformationAmqpDto(PaymentInformationSeed[0].id, PaymentInformationSeed[0].IBAN, PaymentInformationSeed[0].BIC)],
    '',
    '',
    '',
    ''
  ),
  new CompanyAmqpDto(
    'pt0002',
    'Test Participant 02',
    'Dortmund',
    'DE',
    'Teststraße 3',
    '44227',
    '12/748/29584',
    'HRA 5648',
    [new PaymentInformationAmqpDto(PaymentInformationSeed[1].id, PaymentInformationSeed[1].IBAN, PaymentInformationSeed[1].BIC)],
    '',
    '',
    '',
    ''
  ),
  new CompanyAmqpDto(
    'pt0003',
    'Test Participant 03',
    'Dortmund',
    'DE',
    'Teststraße 3',
    '44227',
    '12/748/29484',
    'HRA 5649',
    [new PaymentInformationAmqpDto(PaymentInformationSeed[2].id, PaymentInformationSeed[2].IBAN, PaymentInformationSeed[2].BIC)],
    '',
    '',
    '',
    ''
  ),
];
