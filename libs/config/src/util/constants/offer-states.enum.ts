export enum OfferStatesEnum {
  OPEN = 'Open',
  ACCEPTED = 'Accepted',
  REFUSED = 'Refused',
  EXPIRED = 'Expired',
}

export const OFFER_STATES_TO_SHOW: string[] = [OfferStatesEnum.OPEN, OfferStatesEnum.ACCEPTED];
