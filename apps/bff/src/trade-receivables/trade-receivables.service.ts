import { AmqpBrokerQueues, CreateTradeReceivableAmqpDto, TradeReceivableAmqpDto, TradeReceivableMessagePatterns } from '@ap3/amqp';
import { CreateTradeReceivableDto, TradeReceivableDto } from '@ap3/api';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TradeReceivablesService {
  private readonly logger = new Logger(TradeReceivablesService.name);
  constructor(@Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy) {}

  async create(orderId: string, createTradeReceivableDto: CreateTradeReceivableDto): Promise<TradeReceivableDto> {
    const createTradeReceivableAmqpDto: CreateTradeReceivableAmqpDto = createTradeReceivableDto.toCreateTradeReceivableAmqpDto(orderId);
    const tradeReceivableAmqpDto = await firstValueFrom<TradeReceivableAmqpDto>(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE, createTradeReceivableAmqpDto).pipe(defaultIfEmpty(null))
    );
    return TradeReceivableDto.toTradeReceivableDto(tradeReceivableAmqpDto);
  }

  async findAll(debtorId: string, creditorId: string, orderId: string): Promise<TradeReceivableDto[]> {
    this.logger.debug(`Requesting Tradereceivables debtor #${debtorId}, creditor #${creditorId}, order #${orderId}`);
    const frontendDtos: TradeReceivableDto[] = [];
    let response: TradeReceivableAmqpDto[] = [];
    if (debtorId) {
      response = await firstValueFrom<TradeReceivableAmqpDto[]>(
        this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_DEBTOR_ID, debtorId)
      );
    } else if (creditorId) {
      response = await firstValueFrom<TradeReceivableAmqpDto[]>(
        this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_CREDITOR_ID, creditorId)
      );
    } else if (orderId) {
      response = await firstValueFrom<TradeReceivableAmqpDto[]>(
        this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ORDER_ID, orderId)
      );
    }

    for (const amqpDto of response) {
      frontendDtos.push(TradeReceivableDto.toTradeReceivableDto(amqpDto));
    }
    return frontendDtos;
  }

  async findOne(id: string): Promise<TradeReceivableDto> {
    this.logger.verbose('Requesting trade receivable ', id);
    const retVal = await firstValueFrom<TradeReceivableAmqpDto>(this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ID, id));
    return TradeReceivableDto.toTradeReceivableDto(retVal);
  }
}
