/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { NotPaidStatisticsAmqpDto } from '../not-paid-statistics-amqp.dto';

export const notPaidStatisticsAmqpMock = <NotPaidStatisticsAmqpDto>{
  overdueTradeReceivableCount: 4,
  overdueTradeReceivableValue: 15.0,
  outstandingTradeReceivableCount: 10,
  outstandingTradeReceivableValue: 43.5,
};
