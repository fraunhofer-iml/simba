/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationService } from '@ap3/config';
import { InvoicePrismaService, OfferPrismaService, ServiceProcessPrismaService } from '@ap3/database';
import { S3Service } from '@ap3/s3';
import { OFFER_STATES_TO_SHOW } from '@ap3/util';
import { Injectable } from '@nestjs/common';
import { Invoice, MachineAssignment, Offer, ServiceProcess, ServiceStatus } from '@prisma/client';
import { MetadataDto } from './metadata.dto';

@Injectable()
export class MetadataService {
  constructor(
    private readonly serviceProcessPrismaService: ServiceProcessPrismaService,
    private readonly offerPrismaService: OfferPrismaService,
    private readonly invoicePrismaService: InvoicePrismaService,
    private readonly config: ConfigurationService,
    private readonly s3Service: S3Service
  ) {}

  public async createMetadata(serviceProcessId: string): Promise<MetadataDto> {
    const serviceProcess: ServiceProcess = await this.serviceProcessPrismaService.getServiceProcessById(serviceProcessId);
    const offerIds: string[] = (await this.offerPrismaService.getOffersByOrderId(serviceProcess.orderId, OFFER_STATES_TO_SHOW)).map(
      (offer: Offer) => {
        return offer.id;
      }
    );
    const machineAssignment: MachineAssignment[] = await this.serviceProcessPrismaService.getMachineAssignment(serviceProcessId);
    const invoiceIds: string[] = (await this.invoicePrismaService.getInvoiceByServiceProcessId(serviceProcessId)).map(
      (invoice: Invoice) => {
        return invoice.id;
      }
    );
    const states: ServiceStatus[] = await this.serviceProcessPrismaService.getServiceStatus(serviceProcessId);
    return new MetadataDto(serviceProcess, offerIds, machineAssignment, invoiceIds, states);
  }

  public async uploadMetadata(metadata: MetadataDto): Promise<string> {
    const fileName = `${this.config.getMinioConfig().metadataPrefix}${metadata.serviceProcess.id}.json`;
    await this.s3Service.uploadJson(Buffer.from(JSON.stringify(metadata)), fileName);
    return fileName;
  }
}
