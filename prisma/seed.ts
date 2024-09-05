import { PrismaClient } from '@prisma/client';
import { Entity, importEntities } from './data_import';

const machines = require('./data/machines.json');
const participants = require('./data/participants.json');
const products = require('./data/products.json');

const dataSets: Entity[] = [
  {
    name: 'participant',
    records: participants,
    createRecord: async (data: any) => await prisma.participant.create({data}),
  },
  {
    name: 'machine',
    records: machines,
    createRecord: async (data: any) => await prisma.machine.create({data}),
  },
  {
    name: 'product',
    records: products,
    createRecord: async (data: any) => await prisma.product.create({data}),
  }
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
