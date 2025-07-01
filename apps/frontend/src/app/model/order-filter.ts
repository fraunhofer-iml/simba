export class OrderFilter {
  companyId?: string;
  customerName?: string;
  productionDateFrom?: string;
  productionDateTo?: string;
  serviceStates?: string[];

  constructor(companyId?: string, customerName?: string, productionDateFrom?: string, productionDateTo?: string, serviceStates?: string[]) {
    this.companyId = companyId;
    this.customerName = customerName;
    this.productionDateFrom = productionDateFrom;
    this.productionDateTo = productionDateTo;
    this.serviceStates = serviceStates;
  }
}
