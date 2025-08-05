/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AmqpBrokerQueues,
  CompanyAndInvoiceAmqpDto,
  CreateTradeReceivableAmqpDto,
  InvoiceAmqpDto,
  InvoiceMessagePatterns,
  OrderMessagePatterns,
  TradeReceivableAmqpDto,
  TradeReceivableMessagePatterns,
} from '@ap3/amqp';
import { CreateInvoiceDto, CreateNftDto, TradeReceivableDto } from '@ap3/api';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(@Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy) {}

  public async create(orderId: string, companyId: string): Promise<TradeReceivableDto> {
    try {
      const newInvoice: InvoiceAmqpDto = await firstValueFrom<InvoiceAmqpDto>(
        this.processAMQPClient.send(InvoiceMessagePatterns.CREATE, new CreateInvoiceDto(orderId))
      );

      await firstValueFrom<boolean>(this.processAMQPClient.send(OrderMessagePatterns.FINISH_BY_ID, orderId));

      const params: CompanyAndInvoiceAmqpDto = new CompanyAndInvoiceAmqpDto(companyId, newInvoice.id);
      await firstValueFrom<string>(this.processAMQPClient.send(InvoiceMessagePatterns.CREATE_AND_UPLOAD_ZUGFERD_PDF, params));

      const newToken: TokenReadDto = await firstValueFrom<TokenReadDto>(
        this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE_NFT, new CreateNftDto(newInvoice.id))
      );

      const createTradeReceivableAmqpDto: CreateTradeReceivableAmqpDto = new CreateTradeReceivableAmqpDto(
        new Date(newToken.createdOn),
        newToken.tokenId.toString(),
        newInvoice.id
      );
      const tradeReceivableAmqpDto: TradeReceivableAmqpDto = await firstValueFrom<TradeReceivableAmqpDto>(
        this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE, createTradeReceivableAmqpDto)
      );

      return TradeReceivableDto.fromAmqpDto(tradeReceivableAmqpDto);
    } catch (e) {
      this.logger.warn(e);
      throw e;
    }
  }
}
