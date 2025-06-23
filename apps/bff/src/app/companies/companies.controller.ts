/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { APIUtil, AuthRolesEnum, CompanyDto, KeycloakUser } from '@ap3/api';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';
import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post } from '@nestjs/common';
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
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CUSTOMER, AuthRolesEnum.CONTRIBUTOR] })
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
  findOne(@AuthenticatedUser() user: KeycloakUser, @Param('id') id: string): Promise<CompanyDto> {
    if (!APIUtil.isAdminOrLoggedInCompany(user, id)) {
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
  async update(@AuthenticatedUser() user: KeycloakUser, @Param('id') id: string, @Body() updateCompanyDto: CompanyDto): Promise<void> {
    if (!APIUtil.isAdminOrLoggedInCompany(user, id)) {
      throw new ForbiddenException();
    }
    await this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles({ roles: [AuthRolesEnum.ADMIN] })
  async remove(@Param('id') id: string): Promise<void> {
    await this.companiesService.remove(id);
  }
}
