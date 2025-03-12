/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as util from 'node:util';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CompanyWithPaymentModalitiesTypes } from './types/company-with-payment-modalities.types';

@Injectable()
export class CompanyPrismaService {
  private logger = new Logger(CompanyPrismaService.name);

  constructor(private prisma: PrismaService) {}

  async getCompany(id: string): Promise<CompanyWithPaymentModalitiesTypes | null> {
    this.logger.debug(`Return company by id ${id} from database`);
    try {
      const company = <CompanyWithPaymentModalitiesTypes>await this.prisma.company.findUnique({
        where: { id: id },
        include: {
          paymentInformation: true,
        },
      });
      if (!company) {
        throw new NotFoundException(`Company with id ${id} was not found in database.`);
      }
      return company;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getCompanies(): Promise<CompanyWithPaymentModalitiesTypes[]> {
    this.logger.debug(`Return all companies from database`);
    const companies = <CompanyWithPaymentModalitiesTypes[]>await this.prisma.company.findMany({
      include: {
        paymentInformation: true,
      },
    });
    return companies;
  }
}
