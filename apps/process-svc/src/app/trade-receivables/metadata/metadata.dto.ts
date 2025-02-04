import { MachineAssignment, ServiceProcess, ServiceStatus } from '@prisma/client';

export class MetadataDto {
  serviceProcess: ServiceProcess;
  offerIds: string[];
  machineAssignments: MachineAssignment[];
  invoiceIds: string[];
  states: ServiceStatus[];


  constructor(serviceProcess: ServiceProcess, offerIds: string[], machineAssignments: MachineAssignment[], invoiceIds: string[], states: ServiceStatus[]) {
    this.serviceProcess = serviceProcess;
    this.offerIds = offerIds;
    this.machineAssignments = machineAssignments;
    this.invoiceIds = invoiceIds;
    this.states = states;
  }
}
