/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  GetMachineAssignmentAmqpDto,
  GetMachineAssignmentAMQPMock,
  MachineAssignmentAMQPMock,
  ServiceProcessStatesAmqpMock,
  ServiceProcessStatusAmqpDto,
} from '@ap3/amqp';
import {
  AddMachineAssignmentsQuery,
  AddMachineAssignmentsQuery2,
  DatabaseModule,
  GetMachineAssignmentsQueryMock,
  GetServiceProcessStatesQueryMock,
  MachineAssignmentWithOwnerMock,
  PrismaService,
  ServiceProcessesSeed,
  ServiceStatusWithOrderMock,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProcessController } from '../service-process.controller';
import { ServiceProcessService } from '../service-process.service';

describe('ServiceProcessController', () => {
  let controller: ServiceProcessController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [ServiceProcessController],
      providers: [
        ServiceProcessService,
        {
          provide: PrismaService,
          useValue: {
            serviceProcess: {
              update: jest.fn(),
            },
            machineAssignment: {
              findMany: jest.fn(),
            },
            serviceStatus: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ServiceProcessController>(ServiceProcessController) as ServiceProcessController;
    prisma = module.get<PrismaService>(PrismaService) as PrismaService;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create: should create a new machine assignment for order', async () => {
    const prismaServiceProcessUpdateSpy = jest.spyOn(prisma.serviceProcess, 'update');
    prismaServiceProcessUpdateSpy.mockResolvedValue(ServiceProcessesSeed[0]);

    const retVal = await controller.addAssignment([
      MachineAssignmentAMQPMock[0],
      MachineAssignmentAMQPMock[1],
      MachineAssignmentAMQPMock[2],
    ]);

    expect(prisma.serviceProcess.update).toHaveBeenCalledWith(AddMachineAssignmentsQuery);
    expect(prisma.serviceProcess.update).toHaveBeenCalledWith(AddMachineAssignmentsQuery2);
    expect(retVal).toEqual(true);
  });

  it('create: should get all machine assignment for order id', async () => {
    const expectedResult: GetMachineAssignmentAmqpDto[] = [GetMachineAssignmentAMQPMock[0], GetMachineAssignmentAMQPMock[1]];
    const prismaMachineAssignmentsFindManySpy = jest.spyOn(prisma.machineAssignment, 'findMany');
    prismaMachineAssignmentsFindManySpy.mockResolvedValue([MachineAssignmentWithOwnerMock[0], MachineAssignmentWithOwnerMock[1]]);

    const retVal: GetMachineAssignmentAmqpDto[] = await controller.getAssignments(ServiceProcessesSeed[0].orderId);

    expect(prisma.machineAssignment.findMany).toHaveBeenCalledWith(GetMachineAssignmentsQueryMock);
    expect(retVal).toEqual(expectedResult);
  });

  it('create: should get all service status changes for order', async () => {
    const expectedResult: ServiceProcessStatusAmqpDto[] = [
      ServiceProcessStatesAmqpMock[0],
      ServiceProcessStatesAmqpMock[1],
      ServiceProcessStatesAmqpMock[2],
    ];
    const prismaMachineAssignmentsFindManySpy = jest.spyOn(prisma.serviceStatus, 'findMany');
    prismaMachineAssignmentsFindManySpy.mockResolvedValue([
      ServiceStatusWithOrderMock[0],
      ServiceStatusWithOrderMock[1],
      ServiceStatusWithOrderMock[2],
    ]);

    const retVal: ServiceProcessStatusAmqpDto[] = await controller.getServiceStates(ServiceProcessesSeed[0].orderId);

    expect(prisma.serviceStatus.findMany).toHaveBeenCalledWith(GetServiceProcessStatesQueryMock);
    expect(retVal).toEqual(expectedResult);
  });
});
