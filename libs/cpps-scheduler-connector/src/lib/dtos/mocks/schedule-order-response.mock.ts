import { OffersSeed, ServiceProcessesSeed } from '@ap3/database';
import { ScheduleOrderResponseDto } from '../schedule-order-response.dto';

export const ScheduleOrderResponseMock = <ScheduleOrderResponseDto>{
  orderId: ServiceProcessesSeed[0].orderId,
  pricesPerCW: [
    {
      cw: Number(OffersSeed[0].plannedCalendarWeek),
      price: Number(OffersSeed[0].price),
    },
    {
      cw: Number(OffersSeed[1].plannedCalendarWeek),
      price: Number(OffersSeed[1].price),
    },
    {
      cw: Number(OffersSeed[2].plannedCalendarWeek),
      price: Number(OffersSeed[2].price),
    },
    {
      cw: Number(OffersSeed[3].plannedCalendarWeek),
      price: Number(OffersSeed[3].price),
    },
  ],
};
