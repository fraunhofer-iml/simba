import { AmqpBrokerQueues, CompanyAmqpDto, CompanyMessagePatterns } from '@ap3/amqp';
import { CompanyDto } from '@ap3/api';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CompaniesService {
  constructor(@Inject(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) private readonly masterDataAMQPClient: ClientProxy) {}

  async create(createCompanyDto: CompanyDto) {
    return 'This action adds a new company';
  }

  async findAll(): Promise<CompanyDto[]> {
    const companies: CompanyDto[] = [];
    const companiesAmqp = await firstValueFrom<CompanyAmqpDto[]>(this.masterDataAMQPClient.send(CompanyMessagePatterns.READ_ALL, {}));
    for (const companyAmqp of companiesAmqp) {
      companies.push(CompanyDto.fromAmqpDto(companyAmqp));
    }
    return companies;
  }

  async findOne(id: string): Promise<CompanyDto> {
    const companyAmqp = await firstValueFrom<CompanyAmqpDto>(this.masterDataAMQPClient.send(CompanyMessagePatterns.READ_BY_ID, id));
    return CompanyDto.fromAmqpDto(companyAmqp);
  }

  async update(id: string, updateCompanyDto: CompanyDto) {
    return `This action updates a #${id} company`;
  }

  async remove(id: string) {
    return `This action removes a #${id} company`;
  }
}
