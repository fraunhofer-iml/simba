/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompanyAmqpDto, CompanyMessagePatterns, CreateCompanyAmqpDto } from '@ap3/amqp';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompaniesService } from './companies.service';

@Controller()
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  @MessagePattern(CompanyMessagePatterns.CREATE)
  async create(@Payload() createCompanyDto: CreateCompanyAmqpDto): Promise<string> {
    return this.companyService.create(createCompanyDto);
  }

  @MessagePattern(CompanyMessagePatterns.READ_ALL)
  async findAll(): Promise<CompanyAmqpDto[]> {
    return this.companyService.findAll();
  }

  @MessagePattern(CompanyMessagePatterns.READ_BY_ID)
  async findOne(@Payload() id: string): Promise<CompanyAmqpDto> {
    return this.companyService.findOne(id);
  }

  @MessagePattern(CompanyMessagePatterns.UPDATE_BY_ID)
  update(@Payload() updateCompanyDto: CompanyAmqpDto) {
    return this.companyService.update(updateCompanyDto);
  }

  @MessagePattern(CompanyMessagePatterns.DELETE_BY_ID)
  remove(@Payload() id: string) {
    return this.companyService.remove(id);
  }
}
