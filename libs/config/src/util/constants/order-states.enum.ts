export enum OrderStatesEnum {
  NEW = 'New',
  ACCEPTED = 'Accepted',
  IN_PROGRESS = 'In Progress',
  FINISHED = 'Finished',
  CANCELED = 'Canceled',
}

export const ORDER_STATES_TO_SHOW: string[] = [OrderStatesEnum.NEW, OrderStatesEnum.ACCEPTED, OrderStatesEnum.IN_PROGRESS, OrderStatesEnum.FINISHED];
