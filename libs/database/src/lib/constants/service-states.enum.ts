export enum ServiceStatesEnum {
  OPEN = 'Open',
  PLANNED = 'Planned',
  SCHEDULED = 'Scheduled',
  PRODUCED = 'Produced',
  CANCELED = 'Canceled',
}

export const SERVICE_STATES_TO_SHOW: string[] = [ServiceStatesEnum.PLANNED, ServiceStatesEnum.SCHEDULED, ServiceStatesEnum.PRODUCED];
