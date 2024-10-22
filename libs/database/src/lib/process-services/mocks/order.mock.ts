import {Order} from "@prisma/client";

export const ordersMock = <Order[]>[
  {
    creationDate: new Date(),
    amount: 3,
    status: 'New',
    year: 2024,
    calendarWeek: 38,
    productId: 'prod1',
    participantId: 'pt0001',
    machines: [],
  },
  {
    creationDate: new Date(),
    amount: 2,
    status: 'New',
    year: 2024,
    calendarWeek: 38,
    productId: 'prod1',
    participantId: 'pt0001',
    machines: [],
  }
]
