import {OfferStatesEnum} from "@ap3/config";
import {Offer} from "@prisma/client";

const date = new Date();

export const offersMock= <Offer[]> [
  {
    id: "cm2agsjsk00019tf1urzymlqu",
    creationDate: date,
    price: 1.8,
    status: OfferStatesEnum.ACCEPTED.toString(),
    orderId: "cm2agsjs500009tf1hc9f5guo",
  },
  {
    id: "cm2agsjsn00029tf1z3rqc9vp",
    creationDate: date,
    price: 1.8,
    status: OfferStatesEnum.REFUSED.toString(),
    orderId: "cm2agsjs500009tf1hc9f5guo",
  }
]

export const createOffersMock= <Offer[]> [
  {
    id: "cm2agsjsk00019tf1urzymlqu",
    creationDate: new Date(),
    price: 0.4,
    status: OfferStatesEnum.OPEN.toString(),
    orderId: "cm2agsjs500009tf1hc9f5guo",
  },
  {
    id: "cm2agsjsn00029tf1z3rqc7vp",
    creationDate: new Date(),
    price: 1.4,
    status: OfferStatesEnum.OPEN.toString(),
    orderId: "cm2agsjs500009tf1hc9f5guo",
  },
  {
    id: "cm2agsjsn00029tf1z3rqc8vp",
    creationDate: new Date(),
    price: 2.4,
    status: OfferStatesEnum.OPEN.toString(),
    orderId: "cm2agsjs500009tf1hc9f5guo",
  },
  {
    id: "cm2agsjsn00029tf1z3rqc9vp",
    creationDate: new Date(),
    price: 3.4,
    status: OfferStatesEnum.OPEN.toString(),
    orderId: "cm2agsjs500009tf1hc9f5guo",
  }
]
