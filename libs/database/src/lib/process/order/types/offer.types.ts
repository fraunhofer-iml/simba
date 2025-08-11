import { Decimal } from '@prisma/client/runtime/library';

export type OfferFromPrisma = {
  id: string;
  serviceProcessId: string;
  status: string;
  creationDate: Date;
  decisionDate: Date | null;
  plannedCalendarWeek: Decimal;
  plannedYear: Decimal;
  basicPrice: Decimal;
  timeToProduction: Decimal;
  utilization: Decimal;
};
