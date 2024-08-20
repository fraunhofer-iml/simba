import { Injectable } from '@nestjs/common';
import { OpenOffersMock } from '@ap3/api';

@Injectable()
export class OffersService {
  findAll(orderId: string) {
    return OpenOffersMock;
  }

  findOne(id: string) {
    return OpenOffersMock[0];
  }

  acceptOffer(id: string) {;
  }
}
