import { Order } from '@prisma/client';

export const ordersMock = <Order[]>[
  {
    id: 'cm2uiedwn000108miftzcf209',
    documentIssueDate: new Date(),
    noteContent: '',
    buyerId: '',
    sellerId: '',
    referencedBuyerOrderLine: '',
    buyerOrderRefDocumentId: '',
    sumOfLinesAmount: 5,
    totalAmountWithoutVat: null,
    vatCurrency: '',
    buyerAccountingRefId: '',
  },
  {
    id: 'cm2uiild9000108mnf080gcp7',
    documentIssueDate: new Date(),
    noteContent: '',
    buyerId: '',
    sellerId: '',
    referencedBuyerOrderLine: '',
    buyerOrderRefDocumentId: '',
    sumOfLinesAmount: 5,
    totalAmountWithoutVat: null,
    vatCurrency: '',
    buyerAccountingRefId: '',
  },
];
