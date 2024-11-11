import { CompanyAmqpDto } from '@ap3/amqp';
import { PaymentInformationDto } from './payment-information.dto';

export class CompanyDto {
  id: string;
  name: string;
  city: string;
  countryCode: string;
  address: string;
  zip: string;
  vatId: string;
  commercialRegisterNumber: string;
  paymentInformation: PaymentInformationDto[];
  telephone: string;
  emailAddress: string;
  electronicAddress: string;
  electronicAddressSchemeId: string;

  public static fromAmqpDto(companyAmqp: CompanyAmqpDto): CompanyDto {
    return <CompanyDto>{
      id: companyAmqp.id,
      name: companyAmqp.name,
      city: companyAmqp.city,
      countryCode: companyAmqp.countryCode,
      address: companyAmqp.address,
      zip: companyAmqp.zip,
      vatId: companyAmqp.vatId,
      commercialRegisterNumber: companyAmqp.commercialRegisterNumber,
      paymentInformation: companyAmqp.paymentInformation,
      telephone: companyAmqp.telephone,
      emailAddress: companyAmqp.emailAddress,
      electronicAddress: companyAmqp.electronicAddress,
      electronicAddressSchemeId: companyAmqp.electronicAddressSchemeId,
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
    paymentInformation: PaymentInformationDto[],
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
