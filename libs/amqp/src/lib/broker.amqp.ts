/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AmqpBrokerQueues } from './broker.queues';

export class BrokerAmqp {
  public getProcessSvcBroker(): DynamicModule {
    return this.getMessageBroker(AmqpBrokerQueues.PROCESS_SVC_QUEUE);
  }

  public getMasterDataSvcBroker(): DynamicModule {
    return this.getMessageBroker(AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE);
  }

  private getMessageBroker(queue: string): DynamicModule {
    const amqpUri = process.env['BROKER_URI'] || 'amqp://localhost:5672';

    if (!amqpUri) {
      throw new Error('BROKER_URI in environment variables is not defined');
    }

    return ClientsModule.register([
      {
        name: queue,
        transport: Transport.RMQ,
        options: {
          urls: [amqpUri],
          queue: queue,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]);
  }
}
