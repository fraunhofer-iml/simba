import { PrismaClient } from '@prisma/client';
import { CompaniesSeed } from '../libs/database/src/seed';
import { InvoiceSeed } from '../libs/database/src/seed/invoices.seed';
import { MachinesSeed } from '../libs/database/src/seed/machines.seed';
import { OrderLinesSeed } from '../libs/database/src/seed/order-lines.seed';
import { OrdersSeed } from '../libs/database/src/seed/orders.seed';
import { PaymentStatesSeed } from '../libs/database/src/seed/payment-states.seed';
import { ProductsSeed } from '../libs/database/src/seed/products.seed';
import { SerivceProcessStatesSeed } from '../libs/database/src/seed/service-process-states.seed';
import { ServiceProcessesSeed } from '../libs/database/src/seed/service-process.seed';
import { TradeReceivablesSeed } from '../libs/database/src/seed/trade-receivables.seed';
import { Entity, importEntities } from './data_import';

const machines = MachinesSeed;
const companies = CompaniesSeed;
const products = ProductsSeed;
const invoices = InvoiceSeed;
const paymentStates = PaymentStatesSeed;
const tradeReceivables = TradeReceivablesSeed;
const orderLines = OrderLinesSeed;
const orders = OrdersSeed;
const serviceProcessStates = SerivceProcessStatesSeed;
const serviceProcesses = ServiceProcessesSeed;

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
