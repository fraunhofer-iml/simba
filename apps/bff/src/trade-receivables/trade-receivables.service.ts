import { AmqpBrokerQueues, TradeReceivableAmqpDto, TradeReceivableMessagePatterns } from '@ap3/amqp';
import { CreateTradeReceivableDto, TradeReceivableDto } from '@ap3/api';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TradeReceivablesService {
  private logger = new Logger(TradeReceivablesService.name);
  constructor(@Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy) {}

  async create(createDto: CreateTradeReceivableDto): Promise<void> {
    return await firstValueFrom(this.processAMQPClient.send(TradeReceivableMessagePatterns.CREATE, createDto));
  }

  async findAll(id: string): Promise<TradeReceivableDto[]> {
    this.logger.debug('Requesting Tradereceivables of user : ' + id);
    let frontendDtos: TradeReceivableDto[] = [];
    let amqpDtos: TradeReceivableAmqpDto[] = await firstValueFrom(
      this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_ALL, { id })
    );

    for (let amqpDto of amqpDtos) {
      frontendDtos.push(TradeReceivableAmqpDto.toTradeReceivableDto(amqpDto));
    }
    return frontendDtos;
  }

  async findOne(id: string): Promise<TradeReceivableDto> {
    return await firstValueFrom(this.processAMQPClient.send(TradeReceivableMessagePatterns.READ_BY_ID, { id }));
  }
}
