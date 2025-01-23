import { MachineAssignmentAmqpDto, ServiceProcessPattern } from '@ap3/amqp';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceProcessService } from './service-process.service';

@Controller()
export class ServiceProcessController {
  constructor(private readonly serviceProcessService: ServiceProcessService) {}

  @MessagePattern(ServiceProcessPattern.ADD_MACHINE_ASSIGNMENT)
  async addAssignment(@Payload() assignment: MachineAssignmentAmqpDto[]): Promise<boolean> {
    return await this.serviceProcessService.addNewMachineAssignment(assignment);
  }
}
