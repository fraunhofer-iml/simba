/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {ConfigurationService} from "@ap3/config";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AmqpBrokerQueues} from "@ap3/amqp";

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const configuration = appContext.get(ConfigurationService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [configuration.getGeneralConfig().brokerURI],
      queue: AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.useLogger(configuration.getGeneralConfig().logLevel);

  await app.listen().then(() =>
    Logger.log(
      `🔄 Process service is running with RMQ:
        ${configuration.getGeneralConfig().brokerURI}:${AmqpBrokerQueues.MASTER_DATA_SVC_QUEUE}`
    )
  );
}

bootstrap();
