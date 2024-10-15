import {AmqpBrokerQueues, CreateTradeReceivableAmqpDto, TradeReceivableAmqpDto, TradeReceivableMessagePatterns} from '@ap3/amqp';
import {CreateTradeReceivableDto, TradeReceivableDto} from '@ap3/api';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TradeReceivablesService {
  private logger = new Logger(TradeReceivablesService.name);
  constructor(@Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy) {}

  async create(orderId: string, createTradeReceivableDto: CreateTradeReceivableDto): Promise<TradeReceivableDto> {
    const createTradeReceivableAmqpDto: CreateTradeReceivableAmqpDto = createTradeReceivableDto.toTradeReceivableAmqpDto(orderId);
    const tradeReceivableAmqpDto = await firstValueFrom<TradeReceivableAmqpDto>(this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE, createTradeReceivableAmqpDto).pipe(defaultIfEmpty(null)));
    return TradeReceivableDto.toTradeReceivableDto(tradeReceivableAmqpDto);
  }

  async findAll(id: string): Promise<TradeReceivableDto[]> {
    this.logger.debug('Requesting Tradereceivables of user : ' + id);
    const frontendDtos: TradeReceivableDto[] = [];
    const amqpDtos  = await firstValueFrom<TradeReceivableAmqpDto[]>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_ALL, { id })
    );

    for (const amqpDto of amqpDtos) {
      frontendDtos.push(TradeReceivableDto.toTradeReceivableDto(amqpDto));
    }
    return frontendDtos;
  }

  async findOne(id: string): Promise<TradeReceivableDto> {
    const retVal = await firstValueFrom<TradeReceivableAmqpDto>(this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ID, { id }));
    return TradeReceivableDto.toTradeReceivableDto(retVal);
  }
}
