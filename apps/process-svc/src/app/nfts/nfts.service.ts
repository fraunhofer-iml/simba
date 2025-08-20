/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import util from 'node:util';
import { InvoiceIdAndPaymentStateAmqpDto } from '@ap3/amqp';
import { CreateNftDto } from '@ap3/api';
import { InvoiceDatabaseAdapterService, InvoiceWithOrderBuyerRef, ServiceProcessPrismaService } from '@ap3/database';
import { S3Service } from '@ap3/s3';
import { PaymentStates } from '@ap3/util';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ServiceProcess } from '@prisma/client';
import { InvoicesService } from '../invoices/invoices.service';
import { MetadataDto } from './metadata/metadata.dto';
import { MetadataService } from './metadata/metadata.service';
import { NftFactory } from './util/nft-factory';

@Injectable()
export class NftsService {
  private readonly logger = new Logger(NftsService.name);

  constructor(
    @Inject('NftFactory')
    private readonly persistenceService: NftFactory,
    private readonly metadataService: MetadataService,
    private readonly serviceProcessPrismaService: ServiceProcessPrismaService,
    private readonly invoiceService: InvoicesService,
    private readonly invoicePrismaAdapterService: InvoiceDatabaseAdapterService,
    private readonly s3Service: S3Service
  ) {}

  public async createNft(createNftDto: CreateNftDto): Promise<TokenReadDto> {
    try {
      const invoice: InvoiceWithOrderBuyerRef = await this.invoicePrismaAdapterService.getInvoiceById(createNftDto.invoiceId);
      const invoicePdf = await this.s3Service.fetchFile(invoice.url);
      const invoiceFileUrl: string = this.s3Service.convertFileNameToUrl(invoice.url);

      const serviceProcessId = invoice.serviceProcessId;
      const serviceProcess: ServiceProcess = await this.serviceProcessPrismaService.getServiceProcessById(serviceProcessId);

      const metadata: MetadataDto = await this.metadataService.createMetadata(serviceProcessId);
      const metaDataFileName: string = await this.metadataService.uploadMetadata(metadata);
      const metadataUrl: string = this.s3Service.convertFileNameToUrl(metaDataFileName);

      return this.persistenceService.mintNFT(serviceProcess, invoice.invoiceNumber, invoicePdf, invoiceFileUrl, metadata, metadataUrl);
    } catch (e) {
      this.logger.error(util.inspect(e));
      return null;
    }
  }

  public async updateNft(statusChanges: InvoiceIdAndPaymentStateAmqpDto[]): Promise<boolean> {
    try {
      for (const statusChange of statusChanges) {
        await this.updateNftPaymentState(statusChange.invoiceId, statusChange.paymentStatus);
      }
      return true;
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  public async updateNftPaymentState(invoiceId: string, paymentStates: PaymentStates): Promise<TokenReadDto> {
    try {
      const invoice: InvoiceWithOrderBuyerRef = await this.invoicePrismaAdapterService.getInvoiceById(invoiceId);
      if (!invoice) return;

      const foundNft: TokenReadDto = await this.persistenceService.readNFTForInvoiceNumber(invoice.invoiceNumber);
      if (!foundNft) return;

      const nftPaymentState: PaymentStates = this.persistenceService.getPaymentState(foundNft);
      if (nftPaymentState == paymentStates) return;

      this.logger.log(`The payment status of the invoice with id ${invoice.id} will be updated.`);
      const convertedDto = new InvoiceIdAndPaymentStateAmqpDto(invoice.id, paymentStates);
      await this.invoiceService.createPaymentStatusForInvoice([convertedDto]);

      this.logger.log(`The nft of the invoice with id ${invoiceId} will be updated.`);
      return this.persistenceService.updateNFTStatus(foundNft.tokenId, paymentStates);
    } catch (e) {
      this.logger.error(util.inspect(e));
      return null;
    }
  }

  public async getNftByInvoiceNumber(invoiceNumber: string): Promise<TokenReadDto> {
    return this.persistenceService.readNFTForInvoiceNumber(invoiceNumber);
  }

  public returnAllNFTs(): Promise<TokenReadDto[]> {
    return this.persistenceService.readAllNfts();
  }
}
