import { AmqpBrokerQueues, CreateTradeReceivableAmqpDto, TradeReceivableAmqpDto, TradeReceivableMessagePatterns } from '@ap3/amqp';
import { CreateTradeReceivableDto, TradeReceivableDto } from '@ap3/api';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TokenReadDto } from 'nft-folder-blockchain-connector';

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

  async readAllNfts(): Promise<TokenReadDto[]> {
    return await firstValueFrom<TokenReadDto[]>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_ALL, []).pipe(defaultIfEmpty(null))
    );
  }

  async getNftByInvoiceNumber(invoiceNumber: string): Promise<TokenReadDto> {
    return await firstValueFrom<TokenReadDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ID, invoiceNumber).pipe(defaultIfEmpty(null))
    );
  }
}
