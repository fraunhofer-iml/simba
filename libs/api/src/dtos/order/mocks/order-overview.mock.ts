import { CompaniesSeed, MachinesSeed, OrderLinesSeed, OrdersSeed, ServiceProcessesSeed, ServiceStatesSeed } from '@ap3/database';
import { OpenOffersMock } from '../../offer';
import { ProductDtoMocks } from '../../product';
import { OrderOverviewDto } from '../order-overview.dto';

export const OrderOverviewMock: OrderOverviewDto[] = [
  <OrderOverviewDto>{
    id: OrdersSeed[0].id,
    product: ProductDtoMocks[0],
    amount: +OrderLinesSeed[0].requestedQuantity,
    year: ServiceProcessesSeed[0].dueYear,
    calendarWeek: ServiceProcessesSeed[0].dueCalendarWeek,
    creationDate: OrdersSeed[0].documentIssueDate.toISOString(),
    status: ServiceStatesSeed[0].status,
    statusTimestamp: ServiceStatesSeed[0].timestamp.toISOString(),
    price: OpenOffersMock[0].price,
    robots: [MachinesSeed[0].id, MachinesSeed[1].id],
    customerId: CompaniesSeed[0].id,
    customerName: CompaniesSeed[0].name,
    currency: OrdersSeed[0].vatCurrency,
  },
  <OrderOverviewDto>{
    id: OrdersSeed[1].id,
    product: ProductDtoMocks[0],
    amount: +OrderLinesSeed[1].requestedQuantity,
    year: ServiceProcessesSeed[1].dueYear,
    calendarWeek: ServiceProcessesSeed[1].dueCalendarWeek,
    creationDate: OrdersSeed[1].documentIssueDate.toISOString(),
    status: ServiceStatesSeed[5].status,
    statusTimestamp: ServiceStatesSeed[5].timestamp.toISOString(),
    price: OpenOffersMock[1].price,
    robots: [MachinesSeed[0].id, MachinesSeed[1].id],
    customerId: OrdersSeed[1].buyerId,
    customerName: CompaniesSeed[1].name,
    currency: OrdersSeed[1].vatCurrency,
  },
];
