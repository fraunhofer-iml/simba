import util from 'node:util';
import {
  CreateTradeReceivableAmqpDto,
  TradeReceivableAmqpDto,
} from '@ap3/amqp';
import {
  InvoicePrismaAdapterService,
  InvoiceWithNFT,
  ServiceProcessPrismaService,
  TradeReceivablePrismaService,
} from '@ap3/database';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { PaymentStatus, ServiceProcess, TradeReceivable } from '@prisma/client';
import { BlockchainConnectorService } from '@ap3/blockchain-connector';
import { S3Service } from '@ap3/s3';
import { TokenReadDto } from '@fraunhofer-iml/nft-folder-blockchain-connector';
import { MetadataService } from './metadata/metadata.service';
import { MetadataDto } from './metadata/metadata.dto';

@Injectable()
export class TradeReceivablesService {
  private readonly logger = new Logger(TradeReceivablesService.name);

  constructor(
    private readonly metadataService: MetadataService,
    private readonly blockchainConnectorService: BlockchainConnectorService,
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly serviceProcessPrismaService: ServiceProcessPrismaService,
    private readonly invoicePrismaAdapterService: InvoicePrismaAdapterService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createTradeReceivableDto: CreateTradeReceivableAmqpDto): Promise<TradeReceivableAmqpDto> {
    this.logger.verbose(`create trade receivable ${util.inspect(createTradeReceivableDto)}`);
    try {
      const createTradeReceivable = createTradeReceivableDto.toPrismaCreateEntity();
      const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.createTradeReceivable(createTradeReceivable);
      const trStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(tradeReceivable.id);

      if (tradeReceivable) {
        return TradeReceivableAmqpDto.fromPrismaEntity(tradeReceivable, trStates);
      } else {
        throw new InternalServerErrorException(`Could not create trade receivable ${util.inspect(createTradeReceivableDto)}`);
      }
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  public async createNft(invoiceId: string): Promise<TokenReadDto> {
    const invoice: InvoiceWithNFT = await this.invoicePrismaAdapterService.getInvoiceById(invoiceId);
    const invoicePdf = await this.s3Service.fetchFile(invoice.url);

    const serviceProcessId = invoice.serviceProcessId;
    const serviceProcess: ServiceProcess = await this.serviceProcessPrismaService.getServiceProcessById(serviceProcessId);

    const metadata: MetadataDto = await this.metadataService.createMetadata(serviceProcessId);
    const metaDataFileName: string = await this.metadataService.uploadMetadata(metadata);

    return this.blockchainConnectorService.mintNFT(
      serviceProcess,
      invoice.invoiceNumber,
      invoicePdf,
      invoice.url,
      metadata,
      metaDataFileName
    );
  }

  public returnAllNFTs(): Promise<TokenReadDto[]> {
    return this.blockchainConnectorService.readNFTs();
  }

  public async getNftByTradeReceivableId(trandeReceivableId: string): Promise<TokenReadDto> {
    const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.getTradeReceivable(trandeReceivableId);
    return this.blockchainConnectorService.readNFT(Number(tradeReceivable.nft));
  }
}
