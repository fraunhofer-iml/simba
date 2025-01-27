import {
  CompaniesSeed,
  MachinesSeed,
  OffersSeed,
  OrderLinesSeed,
  OrdersSeed,
  ProductsSeed,
  ServiceProcessesSeed,
  ServiceStatesSeed,
  TradeReceivablesSeed,
} from '@ap3/database';
import { OpenOffersMock } from '../../offer';
import { ProductDtoMocks } from '../../product';
import { OrderOverviewDto } from '../order-overview.dto';
import { OrderDto } from '../order.dto';

export const OrderDtosMock: OrderDto[] = [
  new OrderDto(
    OrdersSeed[0].id,
    ProductsSeed[0].id,
    +OrderLinesSeed[0].requestedQuantity,
    ServiceProcessesSeed[0].dueYear,
    ServiceProcessesSeed[0].dueCalendarWeek,
    OrdersSeed[0].documentIssueDate.toISOString(),
    ServiceStatesSeed[1].status,
    OffersSeed[0].id,
    [OffersSeed[0].id, OffersSeed[1].id, OffersSeed[2].id, OffersSeed[3].id],
    [MachinesSeed[0].id, MachinesSeed[1].id],
    CompaniesSeed[0].id,
    TradeReceivablesSeed[0].id
  ),
  new OrderDto(
    OrdersSeed[1].id,
    ProductsSeed[0].id,
    +OrderLinesSeed[1].requestedQuantity,
    ServiceProcessesSeed[1].dueYear,
    ServiceProcessesSeed[1].dueCalendarWeek,
    OrdersSeed[1].documentIssueDate.toISOString(),
    ServiceStatesSeed[4].status,
    '',
    [],
    [],
    CompaniesSeed[0].id,
    ''
  ),
];

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
    customerId: CompaniesSeed[0].id,
    currency: OrdersSeed[0].vatCurrency,
  },
];
