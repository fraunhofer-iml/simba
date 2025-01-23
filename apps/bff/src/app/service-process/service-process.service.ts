import util from 'node:util';
import { AmqpBrokerQueues, MachineAssignmentAmqpDto, ServiceProcessPattern } from '@ap3/amqp';
import { MachineAssignmentDto } from '@ap3/api';
import { firstValueFrom } from 'rxjs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ServiceProcessService {
  private readonly logger = new Logger(ServiceProcessService.name);
  constructor(@Inject(AmqpBrokerQueues.PROCESS_SVC_QUEUE) private readonly processAMQPClient: ClientProxy) {}

  async addMachineAssignments(machineAssignments: MachineAssignmentDto[]): Promise<void> {
    try {
      const machineAssignmentsAMQP: MachineAssignmentAmqpDto[] = machineAssignments.map((assignment: MachineAssignmentDto) => {
        assignment = new MachineAssignmentDto(assignment.orderId, assignment.machineId, assignment.start, assignment.end);
        return assignment.toAMQPDto();
      });
      await firstValueFrom(this.processAMQPClient.send(ServiceProcessPattern.ADD_MACHINE_ASSIGNMENT, machineAssignmentsAMQP));
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
