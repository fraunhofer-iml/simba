import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { OffersService } from './offers.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

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
  findAll(@Query('orderId') orderId?: string) {
    return this.offersService.findAll(orderId);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get an offer based on the corresponding offer id.'
  })
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  @Patch(':id/accept')
  @ApiOperation({
    description: 'Accept an offer.'
  })
  acceptOffer(@Param('id') id: string) {
    this.offersService.acceptOffer(id);
  }
}
