/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PrismaClient } from '@prisma/client';
import {
  CompaniesSeed,
  InvoiceSeed,
  MachinesSeed,
  OffersSeed,
  OrderLinesSeed,
  OrdersSeed,
  PaymentInformationSeed,
  PaymentStatesSeed,
  ProductsSeed,
  ServiceProcessesSeed,
  ServiceStatesSeed,
  TradeReceivablesSeed,
} from '../libs/database/src/seed';
import { MachineAssignmentSeed } from '../libs/database/src/seed/machine-assignments.seed';
import { ServiceProcessesRelationSeed } from '../libs/database/src/seed/service-process-relations.seed';
import { Entity, importEntities } from './data_import';

const machines = MachinesSeed;
const companies = CompaniesSeed;
const products = ProductsSeed;
const invoices = InvoiceSeed;
const paymentStates = PaymentStatesSeed;
const tradeReceivables = TradeReceivablesSeed;
const orderLines = OrderLinesSeed;
const orders = OrdersSeed;
const serviceProcessStates = ServiceStatesSeed;
const serviceProcesses = ServiceProcessesSeed;
const paymentInformation = PaymentInformationSeed;
const offers = OffersSeed;
const machineAssignments = MachineAssignmentSeed;

const serviceProcessRelations = ServiceProcessesRelationSeed;

const dataSets: Entity[] = [
  {
    name: 'company',
    records: companies,
    createRecord: async (data: any) => await prisma.company.create({ data }),
  },
  {
    name: 'paymentInformation',
    records: paymentInformation,
    createRecord: async (data: any) => await prisma.paymentInformation.create({ data }),
  },
  {
    name: 'machine',
    records: machines,
    createRecord: async (data: any) => await prisma.machine.create({ data }),
  },
  {
    name: 'product',
    records: products,
    createRecord: async (data: any) => await prisma.product.create({ data }),
  },
  {
    name: 'order',
    records: orders,
    createRecord: async (data: any) => await prisma.order.create({ data }),
  },
  {
    name: 'orderLine',
    records: orderLines,
    createRecord: async (data: any) => await prisma.orderLine.create({ data }),
  },
  {
    name: 'serviceProcess',
    records: serviceProcesses,
    createRecord: async (data: any) => await prisma.serviceProcess.create({ data }),
  },
  {
    name: 'serviceProcessStatus',
    records: serviceProcessStates,
    createRecord: async (data: any) => await prisma.serviceStatus.create({ data }),
  },
  {
    name: 'offer',
    records: offers,
    createRecord: async (data: any) => await prisma.offer.create({ data }),
  },
  {
    name: 'invoice',
    records: invoices,
    createRecord: async (data: any) => await prisma.invoice.create({ data }),
  },
  {
    name: 'tradeReceivable',
    records: tradeReceivables,
    createRecord: async (data: any) => await prisma.tradeReceivable.create({ data }),
  },
  {
    name: 'paymentStatus',
    records: paymentStates,
    createRecord: async (data: any) => await prisma.paymentStatus.create({ data }),
  },
  {
    name: 'machineAssignment',
    records: machineAssignments,
    createRecord: async (data: any) => await prisma.machineAssignment.create({ data }),
  },
  {
    name: 'serviceProcessRelations',
    records: serviceProcessRelations,
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
