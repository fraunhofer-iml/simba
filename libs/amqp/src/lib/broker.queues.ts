/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class AmqpBrokerQueues {
  public static PROCESS_SVC_QUEUE = process.env['AMQP_QUEUE_PREFIX'] + 'affds_process_svc';
  public static MASTER_DATA_SVC_QUEUE = process.env['AMQP_QUEUE_PREFIX'] + 'affds_master_data_svc';
}
