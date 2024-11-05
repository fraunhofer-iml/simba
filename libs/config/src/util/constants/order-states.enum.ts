export enum OrderStatesEnum {
  OPEN = 'Open',
  PLANNED = 'Planned',
  SCHEDULED = 'Scheduled',
  PRODUCED = 'Produced',
  CANCELED = 'Canceled',
}

export const ORDER_STATES_TO_SHOW: string[] = [
  OrderStatesEnum.OPEN,
  OrderStatesEnum.PLANNED,
  OrderStatesEnum.SCHEDULED,
  OrderStatesEnum.PRODUCED,
];
