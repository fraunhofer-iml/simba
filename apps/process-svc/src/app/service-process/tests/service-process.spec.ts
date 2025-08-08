/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  GetMachineAssignmentAmqpDto,
  getMachineAssignmentAMQPMock,
  machineAssignmentAMQPMock,
  serviceProcessStatesAmqpMock,
  ServiceProcessStatusAmqpDto,
} from '@ap3/amqp';
import {
  AddMachineAssignmentsQuery,
  AddMachineAssignmentsQuery2,
  DatabaseModule,
  getMachineAssignmentsQueryMock,
  getServiceProcessStatesQueryMock,
  machineAssignmentWithOwnerMock,
  PrismaService,
  serviceProcessesSeed,
  serviceStatusWithOrderMock,
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
    prismaServiceProcessUpdateSpy.mockResolvedValue(serviceProcessesSeed[0]);

    const retVal = await controller.addAssignment([
      machineAssignmentAMQPMock[0],
      machineAssignmentAMQPMock[1],
      machineAssignmentAMQPMock[2],
    ]);

    expect(prisma.serviceProcess.update).toHaveBeenCalledWith(AddMachineAssignmentsQuery);
    expect(prisma.serviceProcess.update).toHaveBeenCalledWith(AddMachineAssignmentsQuery2);
    expect(retVal).toEqual(true);
  });

  it('create: should get all machine assignment for order id', async () => {
    const expectedResult: GetMachineAssignmentAmqpDto[] = [getMachineAssignmentAMQPMock[0], getMachineAssignmentAMQPMock[1]];
    const prismaMachineAssignmentsFindManySpy = jest.spyOn(prisma.machineAssignment, 'findMany');
    prismaMachineAssignmentsFindManySpy.mockResolvedValue([machineAssignmentWithOwnerMock[0], machineAssignmentWithOwnerMock[1]]);

    const retVal: GetMachineAssignmentAmqpDto[] = await controller.getAssignments(serviceProcessesSeed[0].orderId);

    expect(prisma.machineAssignment.findMany).toHaveBeenCalledWith(getMachineAssignmentsQueryMock);
    expect(retVal).toEqual(expectedResult);
  });

  it('create: should get all service status changes for order', async () => {
    const expectedResult: ServiceProcessStatusAmqpDto[] = [
      serviceProcessStatesAmqpMock[0],
      serviceProcessStatesAmqpMock[1],
      serviceProcessStatesAmqpMock[2],
    ];
    const prismaMachineAssignmentsFindManySpy = jest.spyOn(prisma.serviceStatus, 'findMany');
    prismaMachineAssignmentsFindManySpy.mockResolvedValue([
      serviceStatusWithOrderMock[0],
      serviceStatusWithOrderMock[1],
      serviceStatusWithOrderMock[2],
    ]);

    const retVal: ServiceProcessStatusAmqpDto[] = await controller.getServiceStates(serviceProcessesSeed[0].orderId);

    expect(prisma.serviceStatus.findMany).toHaveBeenCalledWith(getServiceProcessStatesQueryMock);
    expect(retVal).toEqual(expectedResult);
  });
});
