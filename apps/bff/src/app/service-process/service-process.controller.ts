import { AuthRolesEnum, MachineAssignmentDto } from '@ap3/api';
import { Roles } from 'nest-keycloak-connect';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceProcessService } from './service-process.service';

@Controller('service-process')
@ApiTags('Service Process')
@ApiBearerAuth()
export class ServiceProcessController {
  constructor(private readonly serviceProcessService: ServiceProcessService) {}

  @Put('machine-assignment')
  @Roles({ roles: [AuthRolesEnum.ADMIN] })
  @ApiOperation({
    description: 'Adds a new machine assignment if not already present.',
  })
  @ApiBody({
    type: [MachineAssignmentDto],
  })
  async addMachineAssignments(@Body() machineAssignments: MachineAssignmentDto[]): Promise<void> {
    await this.serviceProcessService.addMachineAssignments(machineAssignments);
  }
}
