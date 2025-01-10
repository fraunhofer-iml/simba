import { ServiceProcessWithMachineAssignmentsTypes } from '../types/service-process-with-machine-assignments.types';

export class DatabaseUtil {
  static ExtractMachineIdsFromServiceProcess(serviceProcess: ServiceProcessWithMachineAssignmentsTypes | null): string[] {
    const machines: string[] = [];
    if (serviceProcess?.machineAssignments) {
      for (const assignment of serviceProcess.machineAssignments) {
        machines.push(assignment.machine.id);
      }
    }
    return machines;
  }
}
