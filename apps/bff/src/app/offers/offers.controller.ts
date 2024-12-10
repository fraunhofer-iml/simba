import { AuthRolesEnum, OfferDto } from '@ap3/api';
import { Roles } from 'nest-keycloak-connect';
import { Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OffersService } from './offers.service';

@Controller('offers')
@ApiTags('Offers')
@ApiBearerAuth()
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  @ApiOperation({
    description: 'Get all active offers, can be filtered by order id.',
  })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Filter parameter; Only returns offers corresponding to given order id.',
    required: false,
  })
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CUSTOMER] })
  async findAll(@Query('orderId') orderId?: string): Promise<OfferDto[]> {
    return await this.offersService.findAll(orderId);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get an offer based on the corresponding offer id.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the offer.',
    required: true,
  })
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CUSTOMER] })
  async findOne(@Param('id') id: string): Promise<OfferDto> {
    return await this.offersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    description: 'Create new offers.',
  })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the order.',
    required: true,
  })
  @Roles({ roles: [AuthRolesEnum.CUSTOMER] })
  async createOffers(@Query('orderId') orderId: string): Promise<void> {
    await this.offersService.createOffer(orderId);
  }

  @Patch(':id/accept')
  @ApiOperation({
    description: 'Accept an offer.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the offer.',
    required: true,
  })
  @Roles({ roles: [AuthRolesEnum.CUSTOMER] })
  async acceptOffer(@Param('id') id: string): Promise<void> {
    await this.offersService.acceptOffer(id);
  }

  @Patch('decline')
  @ApiOperation({
    description: 'Decline all offers for a specific order',
  })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the order.',
    required: true,
  })
  @Roles({ roles: [AuthRolesEnum.CUSTOMER] })
  async declineOffers(@Query('orderId') orderId: string): Promise<void> {
    await this.offersService.declineOffers(orderId);
  }
}
