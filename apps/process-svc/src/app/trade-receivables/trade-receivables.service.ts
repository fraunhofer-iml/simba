/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import util from 'node:util';
import {
  CreateTradeReceivableAmqpDto,
  InvoiceIdAndPaymentStateAmqpDto,
  TradeReceivableAmqpDto,
} from '@ap3/amqp';
import { CreateNftDto } from '@ap3/api';
import {
  InvoiceDatabaseAdapterService,
  InvoiceWithNFT,
  ServiceProcessPrismaService,
  TradeReceivablePrismaService,
} from '@ap3/database';
import { S3Service } from '@ap3/s3';
import { PaymentStates } from '@ap3/util';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PaymentStatus, ServiceProcess, TradeReceivable } from '@prisma/client';
import { MetadataDto } from './metadata/metadata.dto';
import { MetadataService } from './metadata/metadata.service';
import { NftInterface } from './nft/nft.interface';

@Injectable()
export class TradeReceivablesService {
  private readonly logger = new Logger(TradeReceivablesService.name);

  constructor(
    @Inject('NftService')
    private readonly nftService: NftInterface,
    private readonly metadataService: MetadataService,
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly serviceProcessPrismaService: ServiceProcessPrismaService,
    private readonly invoicePrismaAdapterService: InvoiceDatabaseAdapterService,
    private readonly s3Service: S3Service
  ) {}

  async create(createTradeReceivableDto: CreateTradeReceivableAmqpDto): Promise<TradeReceivableAmqpDto> {
    this.logger.verbose(`create trade receivable ${util.inspect(createTradeReceivableDto)}`);
    const createTradeReceivable = createTradeReceivableDto.toPrismaCreateEntity();
    const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.createTradeReceivable(createTradeReceivable);
    const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tradeReceivable.id);

    if (tradeReceivable) {
      return TradeReceivableAmqpDto.fromPrismaEntity(tradeReceivable, trStates);
    } else {
      const msg = `Could not create trade receivable ${util.inspect(createTradeReceivableDto)}`;
      this.logger.error(msg);
      throw new InternalServerErrorException(msg);
    }
  }

  public async createNft(createNftDto: CreateNftDto): Promise<TokenReadDto> {
    try{
      const invoice: InvoiceWithNFT = await this.invoicePrismaAdapterService.getInvoiceById(createNftDto.invoiceId);
      const invoicePdf = await this.s3Service.fetchFile(invoice.url);
      const invoiceFileUrl: string = this.s3Service.convertFileNameToUrl(invoice.url);

      const serviceProcessId = invoice.serviceProcessId;
      const serviceProcess: ServiceProcess = await this.serviceProcessPrismaService.getServiceProcessById(serviceProcessId);

      const metadata: MetadataDto = await this.metadataService.createMetadata(serviceProcessId);
      const metaDataFileName: string = await this.metadataService.uploadMetadata(metadata);
      const metadataUrl: string = this.s3Service.convertFileNameToUrl(metaDataFileName);

      return this.nftService.mintNFT(
        serviceProcess,
        invoice.invoiceNumber,
        invoicePdf,
        invoiceFileUrl,
        metadata,
        metadataUrl
      );
    }
    catch(e){
      this.logger.error(util.inspect(e));
      return null;
    }
  }

  public async updateNft(statusChanges: InvoiceIdAndPaymentStateAmqpDto[]): Promise<boolean> {
    try {
      for (const statusChange of statusChanges) {
        await this.updateNftPaymentState(
          statusChange.invoiceId,
          statusChange.paymentStatus as PaymentStates
        );
      }
      return true;
    }
    catch(e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  public async updateNftPaymentState(invoiceId: string, paymentStates: PaymentStates): Promise<TokenReadDto> {
    try{
      const invoice: InvoiceWithNFT = await this.invoicePrismaAdapterService.getInvoiceById(invoiceId);
      if (!invoice) return;

      const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.getTradeReceivableByInvoiceId(invoice.id);
      if (!tradeReceivable) return;

      const foundNft: TokenReadDto = await this.nftService.readNFTForInvoiceNumber(invoice.invoiceNumber);
      if (!foundNft) return;

      const nftPaymentState: PaymentStates = this.nftService.getPaymentState(foundNft);
      if (nftPaymentState == paymentStates) return;

      this.logger.log(`The payment status of the trade receivable with id ${tradeReceivable.id} will be updated.`);
      const convertedDto = new InvoiceIdAndPaymentStateAmqpDto(invoice.id, paymentStates);
      await this.tradeReceivablePrismaService.createPaymentState(
        convertedDto.toPrismaCreatePaymentStatusQuery(tradeReceivable.id, new Date())
      );

      this.logger.log(`The nft of the invoice with id ${invoiceId} will be updated.`);
      return this.nftService.updateNFTStatus(foundNft.tokenId, paymentStates);
    }
    catch(e){
      this.logger.error(util.inspect(e));
      return null;
    }
  }

  public async getNftByInvoiceNumber(invoiceNumber: string): Promise<TokenReadDto> {
      return this.nftService.readNFTForInvoiceNumber(invoiceNumber);
  }

  public returnAllNFTs(): Promise<TokenReadDto[]> {
      return this.nftService.readAllNfts();
  }
}
