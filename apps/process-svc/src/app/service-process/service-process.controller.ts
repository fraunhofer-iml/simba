/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { GetMachineAssignmentAmqpDto, MachineAssignmentAmqpDto, ServiceProcessPattern, ServiceProcessStatusAmqpDto } from '@ap3/amqp';
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

  @MessagePattern(ServiceProcessPattern.GET_MACHINE_ASSIGNMENT)
  async getAssignments(@Payload() orderId: string): Promise<GetMachineAssignmentAmqpDto[]> {
    return await this.serviceProcessService.getMachineAssignments(orderId);
  }

  @MessagePattern(ServiceProcessPattern.GET_SERVICE_STATES)
  async getServiceStates(@Payload() orderId: string): Promise<ServiceProcessStatusAmqpDto[]> {
    return await this.serviceProcessService.getServiceProcessStates(orderId);
  }
}
