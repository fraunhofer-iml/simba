import {Controller, Get, Patch, Param, Query, Post} from '@nestjs/common';
import { OffersService } from './offers.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OfferDto } from '@ap3/api';

@Controller('offers')
@ApiTags('Offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  @ApiOperation({
    description: 'Get all active offers, can be filtered by order id.'
  })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Filter parameter; Only returns offers corresponding to given order id.',
    required: false,
  })
  findAll(@Query('orderId') orderId?: string): Promise<OfferDto[]> {
    return this.offersService.findAll(orderId);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get an offer based on the corresponding offer id.'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the offer.',
    required: true,
  })
  findOne(@Param('id') id: string): Promise<OfferDto> {
    return this.offersService.findOne(id);
  }

  @Post()
  @ApiOperation({
    description: 'Create new offers.'
  })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the order.',
    required: true,
  })
  async createOffers(@Query('orderId') orderId: string): Promise<void> {
    console.log("ORDER", orderId);
    await this.offersService.createOffer(orderId);
  }

  @Patch(':id/accept')
  @ApiOperation({
    description: 'Accept an offer.'
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Identifying id; Required to identify the offer.',
    required: true,
  })
  acceptOffer(@Param('id') id: string): void {
    this.offersService.acceptOffer(id);
  }

  @Patch('decline')
  @ApiOperation({
    description: 'Decline all offers for a specific order'
  })
  @ApiQuery({
    name: 'orderId',
    type: String,
    description: 'Identifying id; Required to identify the order.',
    required: true,
  })
  declineOffers(@Query('orderId') orderId: string): void{
    console.log("ORDER", orderId)
    // this.offersService.declineOffers(orderId)
  }
}
