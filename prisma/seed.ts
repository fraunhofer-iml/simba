/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PrismaClient } from '@prisma/client';
import { FinanceDataParser, MasterDataParser, ProcessDataParser, RelationsParser } from '../libs/database/src/seed';
import { Entity, importEntities } from './data_import';

const dataSets: Entity[] = [
  {
    name: 'company',
    records: MasterDataParser.parseCompanies(),
    createRecord: async (data: any) => await prisma.company.create({ data }),
  },
  {
    name: 'paymentInformation',
    records: MasterDataParser.parsePaymentInformation(),
    createRecord: async (data: any) => await prisma.paymentInformation.create({ data }),
  },
  {
    name: 'machine',
    records: MasterDataParser.parseMachines(),
    createRecord: async (data: any) => await prisma.machine.create({ data }),
  },
  {
    name: 'nft',
    records: MasterDataParser.parseNfts(),
    createRecord: async (data: any) => await prisma.nft.create({ data }),
  },
  {
    name: 'product',
    records: MasterDataParser.parseProducts(),
    createRecord: async (data: any) => await prisma.product.create({ data }),
  },
  {
    name: 'order',
    records: ProcessDataParser.parseOrders(),
    createRecord: async (data: any) => await prisma.order.create({ data }),
  },
  {
    name: 'orderLine',
    records: ProcessDataParser.parseOrderLines(),
    createRecord: async (data: any) => await prisma.orderLine.create({ data }),
  },
  {
    name: 'serviceProcess',
    records: ProcessDataParser.parseServiceProcesses(),
    createRecord: async (data: any) => await prisma.serviceProcess.create({ data }),
  },
  {
    name: 'serviceProcessStatus',
    records: ProcessDataParser.parseServiceStates(),
    createRecord: async (data: any) => await prisma.serviceStatus.create({ data }),
  },
  {
    name: 'offer',
    records: ProcessDataParser.parseOffer(),
    createRecord: async (data: any) => await prisma.offer.create({ data }),
  },
  {
    name: 'invoice',
    records: FinanceDataParser.parseInvoices(),
    createRecord: async (data: any) => await prisma.invoice.create({ data }),
  },
  {
    name: 'tradeReceivable',
    records: FinanceDataParser.parseTradeReceivables(),
    createRecord: async (data: any) => await prisma.tradeReceivable.create({ data }),
  },
  {
    name: 'paymentStatus',
    records: FinanceDataParser.parsePaymentStates(),
    createRecord: async (data: any) => await prisma.paymentStatus.create({ data }),
  },
  {
    name: 'machineAssignment',
    records: ProcessDataParser.parseMachineAssignments(),
    createRecord: async (data: any) => await prisma.machineAssignment.create({ data }),
  },
  {
    name: 'serviceProcessRelations',
    records: RelationsParser.parseServiceProcessRelations(),
    createRecord: async (data: any) => await prisma.serviceProcess.updateMany(data),
  },
];
const prisma = new PrismaClient();

importEntities(dataSets)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('### Error during data import:');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
