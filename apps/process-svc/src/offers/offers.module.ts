import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import {DatabaseModule} from "@ap3/database";

@Module({
  imports: [DatabaseModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
