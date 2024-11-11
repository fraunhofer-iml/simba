import { Company } from '@prisma/client';
import { PaymentInformationAmqpDto } from './payment-information-amqp.dto';

export class CompanyAmqpDto {
  id: string;
  name: string;
  city: string;
  countryCode: string;
  address: string;
  zip: string;
  vatId: string;
  commercialRegisterNumber: string;
  paymentInformation: PaymentInformationAmqpDto[];
  telephone: string;
  emailAddress: string;
  electronicAddress: string;
  electronicAddressSchemeId: string;

  public static fromEntity(company: Company, paymentInformation?: PaymentInformationAmqpDto[]): CompanyAmqpDto {
    return <CompanyAmqpDto>{
      id: company.id,
      name: company.name,
      city: company.city,
      countryCode: company.countryCode,
      address: company.address,
      zip: company.zip,
      vatId: company.vatId,
      commercialRegisterNumber: company.commercialRegisterNumber,
      paymentInformation: paymentInformation,
      telephone: company.telephone,
      emailAddress: company.emailAddress,
      electronicAddress: company.electronicAddress,
      electronicAddressSchemeId: company.electronicAddressSchemeId,
    };
  }

  constructor(
    id: string,
    name: string,
    city: string,
    countryCode: string,
    address: string,
    zip: string,
    vatId: string,
    commercialRegisterNumber: string,
    paymentInformation: PaymentInformationAmqpDto[],
    telephone: string,
    emailAddress: string,
    electronicAddress: string,
    electronicAddressSchemeId: string
  ) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.countryCode = countryCode;
    this.address = address;
    this.zip = zip;
    this.vatId = vatId;
    this.commercialRegisterNumber = commercialRegisterNumber;
    this.paymentInformation = paymentInformation;
    this.telephone = telephone;
    this.emailAddress = emailAddress;
    this.electronicAddress = electronicAddress;
    this.electronicAddressSchemeId = electronicAddressSchemeId;
  }
}
