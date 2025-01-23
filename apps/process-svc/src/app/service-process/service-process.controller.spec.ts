import { MachineAssignmentAMQPMock } from '@ap3/amqp';
import {
  AddMachineAssignmentsQuery,
  AddMachineAssignmentsQuery2,
  DatabaseModule,
  PrismaService,
  ServiceProcessesSeed,
} from '@ap3/database';
import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProcessController } from './service-process.controller';
import { ServiceProcessService } from './service-process.service';

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
    expect(retVal).toBe(true);
  });
});
