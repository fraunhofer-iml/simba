import { CompanyDto } from '../company.dto';
import { PaymentInformationDtoMocks } from './payment-information-dto.mocks';

export const CompanyDtoMock: CompanyDto[] = [
  new CompanyDto(
    'pt0001',
    'Test Participant 01',
    'Dortmund',
    'DE',
    'Teststraße 3',
    '44227',
    '12/748/29384',
    'HRA 5647',
    [PaymentInformationDtoMocks[0]],
    '',
    '',
    '',
    ''
  ),
  new CompanyDto(
    'pt0002',
    'Test Participant 02',
    'Dortmund',
    'DE',
    'Teststraße 3',
    '44227',
    '12/748/29584',
    'HRA 5648',
    [PaymentInformationDtoMocks[1]],
    '',
    '',
    '',
    ''
  ),
  new CompanyDto(
    'pt0003',
    'Test Participant 03',
    'Dortmund',
    'DE',
    'Teststraße 3',
    '44227',
    '12/748/29484',
    'HRA 5649',
    [PaymentInformationDtoMocks[2]],
    '',
    '',
    '',
    ''
  ),
];
