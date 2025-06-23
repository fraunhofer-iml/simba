/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceProcessStatusAmqpDto } from '@ap3/amqp';
import { ServiceStatesEnum } from '@ap3/util';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceProcessStatusDto {
  @ApiProperty({
    type: String,
  })
  orderId: string;
  @ApiProperty({
    type: String,
    enum: ServiceStatesEnum,
  })
  status: string;
  @ApiProperty({
    type: String,
    example: '2025-04-05T14:30:00Z',
    description: 'Timestamp in ISO 8601 format',
  })
  timestamp: Date;

  constructor(orderId: string, status: string, timestamp: Date) {
    this.orderId = orderId;
    this.status = status;
    this.timestamp = timestamp;
  }

  public static fromAmqpDto(status: ServiceProcessStatusAmqpDto): ServiceProcessStatusDto {
    return new ServiceProcessStatusDto(status.orderId, status.status, status.timestamp);
  }

  public static fromAmqpDtos(states: ServiceProcessStatusAmqpDto[]): ServiceProcessStatusDto[] {
    return states.map((status) => {
      return ServiceProcessStatusDto.fromAmqpDto(status);
    });
  }
}
