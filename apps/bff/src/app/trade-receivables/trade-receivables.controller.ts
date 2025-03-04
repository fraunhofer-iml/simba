import { AuthRolesEnum, CreateTradeReceivableDto, TradeReceivableDto } from '@ap3/api';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TradeReceivablesService } from './trade-receivables.service';
import { Roles } from 'nest-keycloak-connect';
import { TokenReadDto } from 'nft-folder-blockchain-connector';

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

  @Get("nft")
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiOperation({ description: 'Returns every nft that is stored for the caller.' })
  async readAllNfts(): Promise<TokenReadDto[]> {
    return await this.tradeReceivableService.readAllNfts();
  }

  @Get("nft/:invoiceNumber")
  @Roles({ roles: [AuthRolesEnum.ADMIN, AuthRolesEnum.CONTRIBUTOR] })
  @ApiParam({
    name: 'invoiceNumber',
    type: String,
    description: 'The invoiceNumber of the nft that should be returned.',
    required: true,
  })
  @ApiOperation({ description: 'Returns every nft that is stored for the caller.' })
  async readNftByInvoiceNumber(@Param('invoiceNumber') invoiceNumber: string): Promise<TokenReadDto> {
    return await this.tradeReceivableService.getNftByInvoiceNumber(invoiceNumber);
  }
}
