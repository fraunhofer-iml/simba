/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompanyAmqpDto, CreateCompanyAmqpDto } from '@ap3/amqp';
import { CompanyPrismaService } from '@ap3/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  constructor(private readonly companyPrismaService: CompanyPrismaService) {}

  create(createCompanyDto: CreateCompanyAmqpDto) {
    return 'This action adds a new company';
  }

  async findAll(): Promise<CompanyAmqpDto[]> {
    const companiesDTO: CompanyAmqpDto[] = [];

    const companies = await this.companyPrismaService.getCompanies();
    for (const company of companies) {
      companiesDTO.push(CompanyAmqpDto.fromEntity(company));
    }

    return companiesDTO;
  }

  async findOne(id: string): Promise<CompanyAmqpDto> {
    const company = await this.companyPrismaService.getCompany(id);
    return CompanyAmqpDto.fromEntity(company);
  }

  update(updateCompanyDto: CompanyAmqpDto) {
    return `This action updates a #${updateCompanyDto.id} company`;
  }

  remove(id: string) {
    return `This action removes a #${id} company`;
  }
}
