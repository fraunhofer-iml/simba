/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import util from 'node:util';
import { GetMachineAssignmentAmqpDto, MachineAssignmentAmqpDto, ServiceProcessStatusAmqpDto } from '@ap3/amqp';
import { MachineAssignmentWithOwner, ServiceProcessPrismaService, ServiceStatusWithOrderTypes } from '@ap3/database';
import { ServiceStatesEnum } from '@ap3/util';
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

  async getMachineAssignments(orderId: string): Promise<GetMachineAssignmentAmqpDto[]> {
    this.logger.verbose(`Get machine assignments for order #${orderId}`);
    const machineAssignments: MachineAssignmentWithOwner[] = await this.serviceProcessPrismaService.getMachineAssignments(orderId);

    return machineAssignments.map((assignment) => {
      return GetMachineAssignmentAmqpDto.fromPrismaEntity(assignment);
    });
  }

  async getServiceProcessStates(orderId: string): Promise<ServiceProcessStatusAmqpDto[]> {
    this.logger.verbose(`Get states for order #${orderId}`);
    const serviceStates: ServiceStatusWithOrderTypes[] = await this.serviceProcessPrismaService.getServiceProcessStates(orderId);
    return serviceStates.map((state) => {
      return ServiceProcessStatusAmqpDto.fromPrismaEntity(state);
    });
  }

  async updateServiceStatus(orderId: string, status: ServiceStatesEnum) {
    await this.serviceProcessPrismaService.setServiceState(orderId, status);
  }
}
