/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvoiceIdAndPaymentStateAmqpDto } from '@ap3/amqp';
import { AuthRolesEnum, CreateNftDto } from '@ap3/api';
import { Roles } from 'nest-keycloak-connect';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { NftsService } from './nfts.service';

@Controller('nfts')
@ApiTags('Nfts')
@ApiBearerAuth()
export class NftsController {
  constructor(private readonly nftService: NftsService) {}

  @Post()
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Creates a new nft.' })
  @ApiBody({
    type: String,
    required: true,
    description: 'The invoice id of the invoice that should be used for the nft creation.',
  })
  async createNft(@Payload() createNftDto: CreateNftDto): Promise<TokenReadDto> {
    return await this.nftService.createNft(createNftDto);
  }

  @Put()
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Updates the payment status of a new nft.' })
  @ApiBody({
    type: String,
    required: true,
    description: 'The invoice id of the invoice that should be updated.',
  })
  async updateNftPaymentStatus(@Payload() statusChanges: InvoiceIdAndPaymentStateAmqpDto[]): Promise<boolean> {
    return await this.nftService.updateNft(statusChanges);
  }

  @Get()
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Returns every nft that is stored for the caller.' })
  async readAllNfts(): Promise<TokenReadDto[]> {
    return await this.nftService.readAllNfts();
  }

  @Get(':invoiceNumber')
  @Roles({ roles: [AuthRolesEnum.CUSTOMER, AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiParam({
    name: 'invoiceNumber',
    type: String,
    description: 'The invoiceNumber of the nft that should be returned.',
    required: true,
  })
  @ApiOperation({ description: 'Returns every nft that is stored for the caller.' })
  async readNftByInvoiceNumber(@Param('invoiceNumber') invoiceNumber: string): Promise<TokenReadDto> {
    return await this.nftService.getNftByInvoiceNumber(invoiceNumber);
  }
}
