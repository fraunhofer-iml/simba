/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import util from 'node:util';
import { CreateTradeReceivableAmqpDto, InvoiceIdAndPaymentStateAmqpDto, TradeReceivableAmqpDto } from '@ap3/amqp';
import { BlockchainConnectorService } from '@ap3/blockchain-connector';
import {
  InvoiceDatabaseAdapterService,
  InvoiceWithNFT,
  ServiceProcessPrismaService,
  TradeReceivablePrismaService,
} from '@ap3/database';
import { S3Service } from '@ap3/s3';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PaymentStatus, ServiceProcess, TradeReceivable } from '@prisma/client';
import { TokenReadDto } from 'nft-folder-blockchain-connector';
import { MetadataService } from './metadata/metadata.service';
import { MetadataDto } from './metadata/metadata.dto';
import { CreateNftDto, UpdateNftPaymentStatusDto } from '@ap3/api';
import { PaymentStates } from '@ap3/util';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ConfigurationService } from '@ap3/config';

@Injectable()
export class TradeReceivablesService {
  private readonly logger = new Logger(TradeReceivablesService.name);

  constructor(
    private readonly metadataService: MetadataService,
    private readonly blockchainConnectorService: BlockchainConnectorService,
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly serviceProcessPrismaService: ServiceProcessPrismaService,
    private readonly invoicePrismaAdapterService: InvoiceDatabaseAdapterService,
    private readonly s3Service: S3Service,
    private readonly config: ConfigurationService,
    private readonly schedulerRegistry: SchedulerRegistry
  ) {
    if(config.getNftUpdateScheduleConfig().scheduledNftUpdateEnabled){
      this.addCronJob();
    }
  }

  async create(createTradeReceivableDto: CreateTradeReceivableAmqpDto): Promise<TradeReceivableAmqpDto> {
    this.logger.verbose(`create trade receivable ${util.inspect(createTradeReceivableDto)}`);
    try {
      const createTradeReceivable = createTradeReceivableDto.toPrismaCreateEntity();
      const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.createTradeReceivable(createTradeReceivable);
      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tradeReceivable.id);

      if (tradeReceivable) {
        return TradeReceivableAmqpDto.fromPrismaEntity(tradeReceivable, trStates);
      } else {
        throw new InternalServerErrorException(`Could not create trade receivable ${util.inspect(createTradeReceivableDto)}`);
      }
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  public async createNft(createNftDto: CreateNftDto): Promise<TokenReadDto> {
    const invoice: InvoiceWithNFT = await this.invoicePrismaAdapterService.getInvoiceById(createNftDto.invoiceId);
    const invoicePdf = await this.s3Service.fetchFile(invoice.url);
    const invoiceFileUrl: string = this.s3Service.convertFileNameToUrl(invoice.url);

    const serviceProcessId = invoice.serviceProcessId;
    const serviceProcess: ServiceProcess = await this.serviceProcessPrismaService.getServiceProcessById(serviceProcessId);

    const metadata: MetadataDto = await this.metadataService.createMetadata(serviceProcessId);
    const metaDataFileName: string = await this.metadataService.uploadMetadata(metadata);
    const metadataUrl: string = this.s3Service.convertFileNameToUrl(metaDataFileName);

    return this.blockchainConnectorService.mintNFT(
      serviceProcess,
      invoice.invoiceNumber,
      invoicePdf,
      invoiceFileUrl,
      metadata,
      metadataUrl
    );
  }

  public async updateNft(updateNftPaymentStatusDto: UpdateNftPaymentStatusDto): Promise<TokenReadDto> {
    return this.updateNftPaymentState(updateNftPaymentStatusDto.invoiceNumber, updateNftPaymentStatusDto.paymentStatus);
  }

  private async updateNftPaymentState(invoiceNumber: string, paymentStates: PaymentStates): Promise<TokenReadDto>{
    const invoice: InvoiceWithNFT = await this.invoicePrismaAdapterService.getInvoiceByNumber(invoiceNumber);
    if(!invoice){
      return;
    }

    const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.getTradeReceivableByInvoiceId(invoice.id);
    if(!tradeReceivable){
      return;
    }

    const foundNft: TokenReadDto = await this.blockchainConnectorService.readNFTForInvoiceNumber(invoiceNumber);
    if(!foundNft){
      return;
    }

    const nftPaymentState: PaymentStates = this.blockchainConnectorService.getPaymentState(foundNft);
    if(nftPaymentState == paymentStates){
      return;
    }

    this.logger.log(`The payment status of the trade receivable with id ${tradeReceivable.id} will be updated.`);
    const convertedDto = new InvoiceIdAndPaymentStateAmqpDto(invoice.id, paymentStates);
    await this.tradeReceivablePrismaService.createPaymentState(
      convertedDto.toPrismaCreatePaymentStatusQuery(tradeReceivable.id, new Date())
    );

    this.logger.log(`The nft of the invoice with id ${invoiceNumber} will be updated.`);
    return this.blockchainConnectorService.updateNFTStatus(foundNft.tokenId, paymentStates);
  }

  public returnAllNFTs(): Promise<TokenReadDto[]> {
    return this.blockchainConnectorService.readNFTs();
  }

  public async getNftByInvoiceNumber(invoiceNumber: string): Promise<TokenReadDto> {
    return this.blockchainConnectorService.readNFTForInvoiceNumber(invoiceNumber);
  }

  private addCronJob(): void{
    const cronExpression: string = this.config.getNftUpdateScheduleConfig().scheduledNftUpdateCronJobExpression;
    const newCronJob: CronJob = new CronJob(cronExpression, () => this.schedulePaymentExceedCheck());
    this.schedulerRegistry.addCronJob('checkExceededNfts', newCronJob);
    newCronJob.start();
  }

  private async schedulePaymentExceedCheck(): Promise<void> {
    const invoices: InvoiceWithNFT[] = await this.invoicePrismaAdapterService.getInvoicesCorrespondingToFilterParams(
      { paymentState: PaymentStates.OPEN, creditorId: undefined, debtorId: undefined },
      []
    );
    for (const invoice of invoices) {
      if(invoice.dueDate < (new Date())){
        await this.updateNftPaymentState(invoice.invoiceNumber, PaymentStates.EXCEEDED);
      }
    }
  }
}
