import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import {OrdersModule} from "./orders.module";
import {DatabaseModule} from "@ap3/database";

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, OrdersModule],
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
