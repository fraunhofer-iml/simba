import { CurrentSchedulingDto } from "./current-scheduling.dto";

export class ScheduledProductionPlanDto{
  isOptimized: boolean;
  productionPlan: CurrentSchedulingDto[];

  constructor(isOptimized: boolean, productionPlan: []) {
    this.isOptimized = isOptimized;
    this.productionPlan = productionPlan;
  }
}
