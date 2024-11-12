import { Invoice, Offer, ServiceProcess, ServiceStatus } from '@prisma/client';
import { invoiceMock } from './invoice.mock';
import { machineMock } from './machine.mocks';
import { offersMock } from './offers.mock';
import { serviceStatusMock } from './service-status.mock';

export const serviceProcessMock = <
  (ServiceProcess & { offers: Offer[]; acceptedOffer: Offer; invoice: Invoice; states: ServiceStatus[] })[]
>[
  {
    id: 'cm32tlpy0000108kyhv7vetzh',
    dueCalendarWeek: 5,
    dueYear: 2024,
    orderId: 'cm2uiedwn000108miftzcf209',
    scheduledDate: new Date(),
    machines: [machineMock[0].id, machineMock[1].id],
    offers: offersMock,
    acceptedOffer: offersMock[0],
    states: [serviceStatusMock[0]],
    invoice: invoiceMock[0],
    acceptedOfferId: '',
  },
  {
    id: 'cm32to3ma000008jvf41teuc8',
    dueCalendarWeek: 6,
    dueYear: 2030,
    orderId: 'cm2uiild9000108mnf080gcp7',
    scheduledDate: new Date(),
    machines: [''],
    offers: [],
    acceptedOffer: offersMock[1],
    states: [serviceStatusMock[1]],
    invoice: invoiceMock[1],
    acceptedOfferId: 'cm2agsjsn00029tf1z3rqc9vp',
  },
];
