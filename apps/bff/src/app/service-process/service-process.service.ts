/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import util from 'node:util';
import {
  AmqpBrokerQueues,
  GetMachineAssignmentAmqpDto,
  MachineAssignmentAmqpDto,
  ServiceProcessPattern,
  ServiceProcessStatusAmqpDto,
} from '@ap3/amqp';
import { GetMachineAssignmentDto, MachineAssignmentDto, ServiceProcessStatusDto } from '@ap3/api';
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

  async getMachineAssignments(orderId: string): Promise<GetMachineAssignmentDto[]> {
    try {
      const machineAssignmentsAMQP: GetMachineAssignmentAmqpDto[] = await firstValueFrom(
        this.processAMQPClient.send(ServiceProcessPattern.GET_MACHINE_ASSIGNMENT, orderId)
      );
      return GetMachineAssignmentDto.fromAmqpDtos(machineAssignmentsAMQP);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getServiceStates(orderId: string): Promise<ServiceProcessStatusDto[]> {
    try {
      const serviceStatesAMQP: ServiceProcessStatusAmqpDto[] = await firstValueFrom(
        this.processAMQPClient.send(ServiceProcessPattern.GET_SERVICE_STATES, orderId)
      );
      return ServiceProcessStatusDto.fromAmqpDtos(serviceStatesAMQP);
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }
}
