import { CompaniesSeed, OrderLinesSeed, OrdersSeed, ServiceProcessesSeed, ServiceStatesSeed } from '../../../seed';
import { ProductsSeed } from '../../../seed/products.seed';
import { OrderOverview } from '../order-overview.types';

export const OrderOverviewPrismaMock: any[] = <OrderOverview[]>[
  {
    id: OrdersSeed[0].id,
    documentIssueDate: OrdersSeed[0].documentIssueDate,

    orderLines: [{ item: ProductsSeed[0], requestedQuantity: OrderLinesSeed[0].requestedQuantity }],
    serviceProcess: {
      dueCalendarWeek: ServiceProcessesSeed[0].dueCalendarWeek,
      states: [ServiceStatesSeed[0]],
      dueYear: ServiceProcessesSeed[0].dueYear,
      machines: ServiceProcessesSeed[0].machines,
      offers: [],
      acceptedOffer: null,
      invoice: null,
    },
    buyer: { id: CompaniesSeed[0].id, name: CompaniesSeed[0].name },
    seller: { id: CompaniesSeed[1].id, name: CompaniesSeed[1].name },
  },
  {
    id: OrdersSeed[1].id,
    documentIssueDate: OrdersSeed[1].documentIssueDate,

    orderLines: [{ item: ProductsSeed[0], requestedQuantity: OrderLinesSeed[1].requestedQuantity }],
    serviceProcess: {
      dueCalendarWeek: ServiceProcessesSeed[1].dueCalendarWeek,
      dueYear: ServiceProcessesSeed[1].dueYear,
      states: [ServiceStatesSeed[4], ServiceStatesSeed[5]],
      machines: ServiceProcessesSeed[1].machines,
      offers: [],
      acceptedOffer: null,
      invoice: null,
    },
    buyer: { id: CompaniesSeed[0].id, name: CompaniesSeed[0].name },
    seller: { id: CompaniesSeed[1].id, name: CompaniesSeed[1].name },
  },
];
