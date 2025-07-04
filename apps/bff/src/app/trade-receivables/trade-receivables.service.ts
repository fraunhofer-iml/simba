/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AmqpBrokerQueues,
  CreateTradeReceivableAmqpDto,
  InvoiceIdAndPaymentStateAmqpDto,
  TradeReceivableAmqpDto,
  TradeReceivableMessagePatterns,
} from '@ap3/amqp';
import { CreateNftDto, CreateTradeReceivableDto, TradeReceivableDto } from '@ap3/api';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { NftErrorMessagesEnum } from '@ap3/util';

@Injectable()
export class TradeReceivablesService {
  constructor(
    @Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy,
    @Inject(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE) private readonly masterDataAMQPClient: ClientProxy
  ) {}

  async create(createTradeReceivableDto: CreateTradeReceivableDto): Promise<TradeReceivableDto> {
    const createTradeReceivableAmqpDto: CreateTradeReceivableAmqpDto = createTradeReceivableDto.toCreateTradeReceivableAmqpDto();
    const tradeReceivableAmqpDto = await firstValueFrom<TradeReceivableAmqpDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE, createTradeReceivableAmqpDto).pipe(defaultIfEmpty(null))
    );
    return TradeReceivableDto.fromAmqpDto(tradeReceivableAmqpDto);
  }

  async createNft(createNftDto: CreateNftDto): Promise<TokenReadDto> {
    const returnValue: TokenReadDto = await firstValueFrom<TokenReadDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE_NFT, createNftDto).pipe(defaultIfEmpty(null))
    );
    if(!returnValue){
      throw new BadRequestException(NftErrorMessagesEnum.NotCreated);
    }
    return returnValue;
  }

  async updateNft(statusChanges: InvoiceIdAndPaymentStateAmqpDto[]): Promise<boolean> {
    const returnValue = await firstValueFrom<boolean>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.UPDATE_NFT, statusChanges).pipe(defaultIfEmpty(null))
    );
    if(!returnValue){
      throw new NotFoundException(NftErrorMessagesEnum.NotFound);
    }
    return returnValue as boolean;
  }

  async getNftByInvoiceNumber(invoiceNumber: string): Promise<TokenReadDto> {
    const foundToken: TokenReadDto = await firstValueFrom<TokenReadDto>(this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ID, invoiceNumber).pipe(defaultIfEmpty(null)))
      .then(value => {return value ?? value as TokenReadDto});
    if(!foundToken){
      throw new NotFoundException(NftErrorMessagesEnum.NotFound);
    }
    return foundToken;
  }

  async readAllNfts(): Promise<TokenReadDto[]> {
    return await firstValueFrom<TokenReadDto[]>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_ALL, []).pipe(defaultIfEmpty(null))
    );
  }
}
