/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationService } from '@ap3/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuration = app.get(ConfigurationService);

  const config = new DocumentBuilder().setTitle('SKALA AP3 backend for frontend').setVersion('0.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(configuration.getGeneralConfig().swaggerPath, app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.useLogger(configuration.getGeneralConfig().logLevel);
  app.enableCors();
  const port = configuration.getGeneralConfig().bffPort;
  await app.listen(port);
  Logger.log(`🚀 AP3 Backend for Frontend is running on: http://localhost:${port}`);
}

bootstrap();
