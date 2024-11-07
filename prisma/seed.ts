import { PrismaClient } from '@prisma/client';
import { Entity, importEntities } from './data_import';

const machines = require('./data/machines.json');
const companies = require('./data/companies.json');
const products = require('./data/products.json');
const invoices = require('./data/invoices.json');
const paymentStates = require('./data/payment-states.json');
const tradeReceivables = require('./data/trade-receivables.json');
const orderLines = require('./data/order-lines.json');
const orders = require('./data/orders.json');
const serviceProcessStates = require('./data/service-process-states.json');
const serviceProcesses = require('./data/service-process.json');

const dataSets: Entity[] = [
  {
    name: 'company',
    records: companies,
    createRecord: async (data: any) => await prisma.company.create({ data }),
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
