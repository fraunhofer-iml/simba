import { MachinesSeed, OrdersSeed } from '@ap3/database';
import { OpenOffersMock } from '../../offer';
import { ProductDtoMocks } from '../../product';
import { OrderOverviewDto } from '../order-overview.dto';
import { OrderDto } from '../order.dto';

export const OrderDtosMock: OrderDto[] = [
  new OrderDto('O1', ProductDtoMocks[0].id, 1, 2024, 52, '2024-08-31T13:24:16.595Z', 'Accepted', '', [], ['M1', 'M2'], 'pt0001', ''),
  new OrderDto('O2', ProductDtoMocks[1].id, 1, 2024, 52, '2024-08-30T13:24:16.595Z', 'Accepted', '', [], ['M1', 'M2'], 'pt0001', ''),
];

export const OrderOverviewMock: OrderOverviewDto[] = [
  new OrderOverviewDto(
    OrdersSeed[0].id,
    ProductDtoMocks[0],
    2,
    2024,
    50,
    '2024-10-09T07:55:55.695Z',
    'Open',
    '2024-10-09T07:55:55.695Z',
    OpenOffersMock[0].price,
    [MachinesSeed[0].id, MachinesSeed[2].id],
    'pt0001'
  ),
  new OrderOverviewDto(
    OrdersSeed[1].id,
    ProductDtoMocks[0],
    4,
    2024,
    52,
    '2024-10-02T07:55:55.695Z',
    'Planned',
    '2024-10-02T08:55:55.695Z',
    OpenOffersMock[1].price,
    [MachinesSeed[0].id, MachinesSeed[1].id],
    'pt0001'
  ),
];
