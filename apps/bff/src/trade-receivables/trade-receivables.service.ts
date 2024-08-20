import { Injectable } from '@nestjs/common';
import { TradeReceivableMocks } from '@ap3/api';

@Injectable()
export class TradeReceivablesService {
  create(orderId: string) {
    return;
  }

  findAll() {
    return TradeReceivableMocks;
  }

  findOne(id: string) {
    return TradeReceivableMocks[0];
  }
}
