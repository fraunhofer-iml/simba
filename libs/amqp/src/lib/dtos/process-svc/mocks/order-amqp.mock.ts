import { OrderLinesSeed, OrdersSeed, ServiceProcessesSeed, ServiceStatesSeed } from '@ap3/database';
import { ServiceStatusAmqpDto } from '../order';
import { OrderAmqpDto } from '../order/order-amqp.dto';

export const OrderAmqpMock = <OrderAmqpDto[]>[
  {
    id: OrdersSeed[0].id,
    productId: OrderLinesSeed[0].itemId,
    amount: +OrderLinesSeed[0].requestedQuantity,
    year: ServiceProcessesSeed[0].dueYear,
    calendarWeek: ServiceProcessesSeed[0].dueCalendarWeek,
    creationDate: new Date(ServiceStatesSeed[0].timestamp).toISOString(),
    status: new ServiceStatusAmqpDto(ServiceStatesSeed[0].status, new Date(ServiceStatesSeed[0].timestamp).toISOString()),
    acceptedOfferId: undefined,
    offerIds: [],
    robots: ServiceProcessesSeed[0].machines,
    customerId: OrdersSeed[0].buyerId,
    tradeReceivableId: undefined,
  },
  {
    id: OrdersSeed[1].id,
    productId: OrderLinesSeed[1].itemId,
    amount: +OrderLinesSeed[1].requestedQuantity,
    year: ServiceProcessesSeed[1].dueYear,
    calendarWeek: ServiceProcessesSeed[1].dueCalendarWeek,
    creationDate: new Date(ServiceStatesSeed[4].timestamp).toISOString(),
    status: new ServiceStatusAmqpDto(ServiceStatesSeed[5].status, new Date(ServiceStatesSeed[5].timestamp).toISOString()),
    acceptedOfferId: undefined,
    offerIds: [],
    robots: ServiceProcessesSeed[1].machines,
    customerId: OrdersSeed[1].buyerId,
    tradeReceivableId: undefined,
  },
];
