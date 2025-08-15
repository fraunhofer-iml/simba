import util from 'node:util';
import { InvoiceIdAndPaymentStateAmqpDto } from '@ap3/amqp';
import { InvoiceDatabaseAdapterService, InvoiceWithNFT, TradeReceivablePrismaService } from '@ap3/database';
import { PaymentStates } from '@ap3/util';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { PaymentStatus, TradeReceivable } from '@prisma/client';
import { NftFactory } from '../../trade-receivables/nft/nft-factory';

@Injectable()
export class PaymentManagementService {
  private readonly logger = new Logger(PaymentManagementService.name);
  constructor(
    @Inject('NftFactory')
    private readonly persistenceFactory: NftFactory,
    private readonly tradeReceivablePrismaService: TradeReceivablePrismaService,
    private readonly invoicePrismaAdapterService: InvoiceDatabaseAdapterService
  ) {}
  public async createPaymentStateAndUpdateNft(idsAndStates: InvoiceIdAndPaymentStateAmqpDto[]): Promise<TokenReadDto> {
    try {
      for (const idAndState of idsAndStates) {
        const invoice: InvoiceWithNFT = await this.invoicePrismaAdapterService.getInvoiceById(idAndState.invoiceId);
        if (!invoice) return;
        const tradeReceivable: TradeReceivable = await this.tradeReceivablePrismaService.getTradeReceivableByInvoiceId(invoice.id);
        if (!tradeReceivable) return;
        const paymentStates: PaymentStatus[] = await this.tradeReceivablePrismaService.getPaymentStatesForTradeReceivable(
          tradeReceivable.id
        );
        const currentPaymentState = this.getLatestPaymentState(paymentStates);
        if (currentPaymentState == idAndState.paymentStatus) return;
        this.logger.log(`A new payment status for the trade receivable with id ${tradeReceivable.id} will be created.`);
        const convertedDto = new InvoiceIdAndPaymentStateAmqpDto(invoice.id, idAndState.paymentStatus);
        await this.tradeReceivablePrismaService.createPaymentState(
          convertedDto.toPrismaCreatePaymentStatusQuery(tradeReceivable.id, new Date())
        );
        const foundNft: TokenReadDto = await this.persistenceFactory.readNFTForInvoiceNumber(invoice.invoiceNumber);
        if (!foundNft) return;
        this.logger.log(`The nft of the invoice with id ${idAndState.invoiceId} will be updated.`);
        return this.persistenceFactory.updateNFTStatus(foundNft.tokenId, idAndState.paymentStatus);
      }
    } catch (e) {
      this.logger.error(util.inspect(e));
      throw e;
    }
  }

  private getLatestPaymentState(paymentStatus: PaymentStatus[]): PaymentStates {
    if (paymentStatus.length === 0) {
      throw new Error('Paymentstates are empty');
    }

    let latestObject: PaymentStatus = paymentStatus[0];
    let latestTimestamp: number = new Date(paymentStatus[0].timestamp).getTime();

    for (let i = 1; i < paymentStatus.length; i++) {
      const currentDto = paymentStatus[i];
      const currentTimestamp = new Date(currentDto.timestamp).getTime();

      if (currentTimestamp > latestTimestamp) {
        latestTimestamp = currentTimestamp;
        latestObject = currentDto;
      }
    }

    return latestObject.status as PaymentStates;
  }
}
