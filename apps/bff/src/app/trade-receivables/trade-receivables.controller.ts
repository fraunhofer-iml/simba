import { PaidTrStatisticsAmqpDto } from '@ap3/amqp';
import { AuthRolesEnum, CreateTradeReceivableDto, FinancialRoles, TradeReceivableDto, UnpaidTrStatisticsDto } from '@ap3/api';
import { Roles } from 'nest-keycloak-connect';
import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TradeReceivablesService } from './trade-receivables.service';

@Controller('trade-receivables')
@ApiTags('Trade Receivables')
@ApiBearerAuth()
export class TradeReceivablesController {
  constructor(private readonly tradeReceivableService: TradeReceivablesService) {}

  @Post()
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Create new trade receivables.' })
  @ApiBody({
    type: CreateTradeReceivableDto,
    required: true,
  })
  async create(@Body() createTradeReceivableDto: CreateTradeReceivableDto): Promise<TradeReceivableDto> {
    return await this.tradeReceivableService.create(createTradeReceivableDto);
  }

  @Get('/statistics/paid')
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR, AuthRolesEnum.CUSTOMER] })
  @ApiOperation({ description: 'Get a statistic for all trade receivables paid in a given year, grouped by month. ' })
  @ApiQuery({
    name: 'year',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'financialRole',
    type: String,
    required: true,
  })
  @ApiResponse({ type: [PaidTrStatisticsAmqpDto] })
  async getStatisticPaidTradePerMonth(
    @Request() req: any,
    @Query('year') year: number,
    @Query('financialRole') financialRole: FinancialRoles
  ): Promise<PaidTrStatisticsAmqpDto[]> {
    return await this.tradeReceivableService.getStatisticPaidTRPerMonth(req.user.company, year, financialRole);
  }

  @Get('/statistics/unpaid')
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR, AuthRolesEnum.CUSTOMER] })
  @ApiOperation({ description: 'Get trade receivables statistics by companyId.' })
  @ApiQuery({
    name: 'financialRole',
    type: String,
    required: true,
  })
  @ApiResponse({ type: UnpaidTrStatisticsDto })
  async getStatisticUnpaidTrade(
    @Request() req: any,
    @Query('financialRole') financialRole: FinancialRoles
  ): Promise<UnpaidTrStatisticsDto> {
    return await this.tradeReceivableService.getStatisticNotPaidTRPerMonth(req.user.company, financialRole);
  }
}
