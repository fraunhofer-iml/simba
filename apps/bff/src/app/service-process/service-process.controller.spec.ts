/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmqpBrokerQueues, MachineAssignmentAMQPMock, ServiceProcessPattern } from '@ap3/amqp';
import { MachineAssignmentsDtoMock } from '@ap3/api';
import { of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProcessController } from './service-process.controller';
import { ServiceProcessService } from './service-process.service';

describe('ServiceProcessController', () => {
  let controller: ServiceProcessController;
  let processSvcClientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceProcessController],
      providers: [
        ServiceProcessService,
        {
          provide: AmqpBrokerQueues.PROCESS_SVC_QUEUE,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ServiceProcessController>(ServiceProcessController) as ServiceProcessController;
    processSvcClientProxy = module.get<ClientProxy>(AmqpBrokerQueues.PROCESS_SVC_QUEUE) as ClientProxy;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new machine assignments.', async () => {
    const sendRequestSpy = jest.spyOn(processSvcClientProxy, 'send');
    sendRequestSpy.mockImplementation((messagePattern: ServiceProcessPattern, data: any) => {
      return of(true);
    });

    await controller.addMachineAssignments(MachineAssignmentsDtoMock);

    expect(sendRequestSpy).toHaveBeenCalledWith(ServiceProcessPattern.ADD_MACHINE_ASSIGNMENT, MachineAssignmentAMQPMock);
  });
});
