import { Machine } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const machineMock = <Machine[]>[
  {
    id: 'cm36zvaom000108jk75746j7j',
    cppsId: 'cm36zw7yq000308jk3cvzblmz',
    description: 'Super Pombääär Maschine',
    minimalPrice: new Decimal(8),
  },
  {
    id: 'cm36zxzwf000408jker5cfzgf',
    cppsId: 'cm36zy8ky000508jk3zu98g1u',
    description: 'Super Schnihitzel Maschine',
    minimalPrice: new Decimal(8),
  },
];
