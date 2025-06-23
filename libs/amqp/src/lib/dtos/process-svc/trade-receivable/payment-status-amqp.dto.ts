/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentStatus } from '@prisma/client';

export class PaymentStatusAmqpDto {
  status: string;
  timestamp: Date;

  constructor(status: string, timestamp: Date) {
    this.status = status;
    this.timestamp = timestamp;
  }

  public static fromPrismaEntity(state: PaymentStatus): PaymentStatusAmqpDto {
    return new PaymentStatusAmqpDto(state.status, state.timestamp);
  }
}
