import { OffersSeed, OrderLinesSeed } from '@ap3/database';
import { AcceptScheduledOfferDto } from '../accept-scheduled-offer.dto';

export const AcceptScheduledOfferResponseMock = <AcceptScheduledOfferDto>{
  cw: Number(OffersSeed[0].plannedCalendarWeek),
  message: 'Order orAE23 accepted',
  price: Number(OffersSeed[0].price),
  product: {
    id: OrderLinesSeed[0].itemId,
    quantity: Number(OrderLinesSeed[0].requestedQuantity),
  },
};
