import util from 'node:util';
import { MachineAssignmentAmqpDto } from '@ap3/amqp';
import { ServiceProcessPrismaService } from '@ap3/database';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ServiceProcessService {
  private readonly logger = new Logger(ServiceProcessService.name);
  constructor(private readonly serviceProcessPrismaService: ServiceProcessPrismaService) {}

  async addNewMachineAssignment(assignments: MachineAssignmentAmqpDto[]): Promise<boolean> {
    this.logger.verbose(`Add new machine assignments: ${util.inspect(assignments)}`);
    let assignmentsForSameOrder: MachineAssignmentAmqpDto[];
    while (assignments && assignments.length > 0) {
      assignmentsForSameOrder = assignments.filter((assignment) => assignment.orderId === assignments[0].orderId);
      assignments = assignments.filter((assignment) => !assignmentsForSameOrder.includes(assignment));
      await this.serviceProcessPrismaService.updateMachineAssignment(assignmentsForSameOrder, assignmentsForSameOrder[0].orderId);
    }
    return true;
  }
}
