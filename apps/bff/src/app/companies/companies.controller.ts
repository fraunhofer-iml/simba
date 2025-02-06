import { AuthRolesEnum, CompanyDto } from '@ap3/api';
import { UserRoles } from '@ap3/util';
import { Roles } from 'nest-keycloak-connect';
import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';

@Controller('companies')
@ApiTags('Companies')
@ApiBearerAuth()
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @Roles({ roles: [AuthRolesEnum.ADMIN] })
  @ApiOperation({
    description: 'Creates a new company and returns the assigned id.',
  })
  @ApiBody({
    type: CompanyDto,
  })
  async create(@Body() createCompanyDto: CompanyDto): Promise<void> {
    await this.companiesService.create(createCompanyDto);
  }

  @Get()
  @Roles({ roles: [AuthRolesEnum.ADMIN] })
  @ApiOperation({
    description: 'Get all available companies.',
  })
  @ApiResponse({
    type: [CompanyDto],
  })
  findAll(): Promise<CompanyDto[]> {
    return this.companiesService.findAll();
  }

  @Get(':id')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({
    description: 'Get a company based on the corresponding company id.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the company.',
    required: true,
  })
  @ApiResponse({
    type: CompanyDto,
  })
  findOne(@Request() req, @Param('id') id: string): Promise<CompanyDto> {
    if (!req.user.realm_access.roles.includes(UserRoles.ADMIN) && id !== req.user.company) {
      throw new ForbiddenException();
    }
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({
    description: 'Updates a company based on the given company data.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the company.',
    required: true,
  })
  @ApiBody({ type: CompanyDto })
  update(@Request() req, @Param('id') id: string, @Body() updateCompanyDto: CompanyDto): Promise<string> {
    if (!req.user.realm_access.roles.includes(UserRoles.ADMIN) && id !== req.user.company) {
      throw new ForbiddenException();
    }
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles({ roles: [AuthRolesEnum.ADMIN] })
  remove(@Param('id') id: string): Promise<string> {
    return this.companiesService.remove(id);
  }
}
