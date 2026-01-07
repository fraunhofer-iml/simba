import { Prisma } from '@prisma/client';

export const AggregatedIdMock: Prisma.GetNftAggregateType<{
  _max: {
    id: true;
  };
}> = { _max: { id: 0 } };
