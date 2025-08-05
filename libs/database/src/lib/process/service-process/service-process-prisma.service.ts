/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as util from 'node:util';
import { MachineAssignmentAmqpDto } from '@ap3/amqp';
import { ServiceStatesEnum } from '@ap3/util';
import { Injectable, Logger } from '@nestjs/common';
import { MachineAssignment, ServiceProcess, ServiceStatus } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { MachineAssignmentWithOwner, ServiceStatusWithOrderTypes } from './types';

@Injectable()
export class ServiceProcessPrismaService {
  private logger = new Logger(ServiceProcessPrismaService.name);

  constructor(private prismaService: PrismaService) {}

  async getServiceProcessById(id: string): Promise<ServiceProcess | null> {
    try {
      return await this.prismaService.serviceProcess.findUnique({
        where: { id: id },
      });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async getServiceProcessByIds(ids: string[]): Promise<ServiceProcess[]> {
    return await this.prismaService.serviceProcess.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async setServiceProcessAcceptedOffer(id: string, offerId: string): Promise<ServiceProcess | null> {
    try {
      return await this.prismaService.serviceProcess.update({
        where: { id: id },
        data: { acceptedOfferId: offerId },
      });
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  async setServiceState(orderId: string, state: ServiceStatesEnum): Promise<ServiceProcess> {
    return this.prismaService.serviceProcess.update({
      where: { orderId: String(orderId) },
      include: { order: true },
      data: {
        states: {
          create: {
            status: state.toString(),
            timestamp: new Date(),
          },
        },
      },
    });
  }

  async updateMachineAssignment(assignment: MachineAssignmentAmqpDto[], orderId: string): Promise<ServiceProcess> {
    return this.prismaService.serviceProcess.update({
      where: { orderId: String(orderId) },
      data: {
        machineAssignments: {
          createMany: {
            data: assignment.map((assign) => ({
              machineId: assign.machineId,
              start: assign.start,
              end: assign.end,
            })),
          },
        },
      },
    });
  }

  async getMachineAssignments(orderId: string): Promise<MachineAssignmentWithOwner[]> {
    return this.prismaService.machineAssignment.findMany({
      where: { serviceProcess: { orderId: String(orderId) } },
      include: {
        serviceProcess: { select: { orderId: true } },
        machine: {
          select: {
            company: { select: { id: true, name: true } },
          },
        },
      },
    });
  }

  async getServiceProcessStates(orderId: string): Promise<ServiceStatusWithOrderTypes[]> {
    return this.prismaService.serviceStatus.findMany({
      where: { serviceProcess: { orderId: String(orderId) } },
      include: {
        serviceProcess: { select: { orderId: true } },
      },
    });
  }

  async getMachineAssignment(serviceProcessId: string): Promise<MachineAssignment[]> {
    return this.prismaService.machineAssignment.findMany({
      where: { serviceProcessId: serviceProcessId },
    });
  }

  async getServiceStatus(serviceProcessId: string): Promise<ServiceStatus[]> {
    return this.prismaService.serviceStatus.findMany({
      where: { serviceProcessId: serviceProcessId },
    });
  }
}
