/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfigurationService } from '@ap3/config';
import { firstValueFrom, of } from 'rxjs';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { GET_CURRENCT_SCHEDULING, GET_NEW_OFFERS, POST_SCHEDULE_ORDER, PUT_ACCEPT_OFFER } from './cpps-scheduler-endpoints.enum';
import {
  AcceptScheduledOfferDto,
  CurrentSchedulingDto,
  ScheduledPricesCwDto,
  ScheduleOrderRequestDto,
  ScheduleOrderResponseDto,
} from './dtos';
import { RequestedCwForOrderDto } from './dtos/requested-cw-for-order.dto';

@Injectable()
export class CppsSchedulerConnectorService {
  private logger = new Logger(CppsSchedulerConnectorService.name);
  private readonly baseURL;

  constructor(private readonly config: ConfigurationService) {
    this.baseURL = config.getCppsSchedulerConfig().baseURL;
  }

  public async getCurrentScheduling(): Promise<CurrentSchedulingDto[]> {
    const request = new Request(this.baseURL + GET_CURRENCT_SCHEDULING, {
      method: 'GET',
      headers: this.buildHeader(),
    });

    const response = await fetch(request);
    if (!response.ok) {
      this.throwSchedulerException(response);
    }
    return await response.json();
    if (!response.ok) {
      this.throwSchedulerException(response);
    }
    return await response.json();
  }

  //This function is Mocked until Scheduler has been modified to return basicPrice, utilization and timeUntilProduction data
  public async scheduleOrder(order: ScheduleOrderRequestDto): Promise<ScheduleOrderResponseDto> {
    this.logger.verbose(`Schedule order ${this.baseURL + POST_SCHEDULE_ORDER} #${order.id}`);
    const request = new Request(this.baseURL + POST_SCHEDULE_ORDER, {
      method: 'POST',
      headers: this.buildHeader(),
      body: JSON.stringify(order),
    });

    const response = await fetch(request);
    if (!response.ok) {
      this.throwSchedulerException(response);
    }

    return await response.json();
  }

  public async generateNewOffersForOrder(requestedCwForOrderDto: RequestedCwForOrderDto): Promise<ScheduleOrderResponseDto> {
    this.logger.verbose(
      `Schedule order ${this.baseURL + GET_NEW_OFFERS(requestedCwForOrderDto.orderId)} #${requestedCwForOrderDto.orderId}`
    );
    const request = new Request(this.baseURL + GET_NEW_OFFERS(requestedCwForOrderDto.orderId), {
      method: 'POST',
      headers: this.buildHeader(),
      body: JSON.stringify({ startCW: requestedCwForOrderDto.cw }),
    });

    const response = await fetch(request);
    if (!response.ok) {
      this.throwSchedulerException(response);
    }
    return await response.json();
  }

  public async acceptOffer(orderId: string, acceptDto: AcceptScheduledOfferDto): Promise<AcceptScheduledOfferDto> {
    this.logger.verbose(`Accept scheduling for order ${this.baseURL + POST_SCHEDULE_ORDER} #${orderId}`);
    const request = new Request(this.baseURL + PUT_ACCEPT_OFFER(orderId), {
      method: 'PUT',
      headers: this.buildHeader(),
      body: JSON.stringify(acceptDto),
    });

    const response = await fetch(request);
    if (!response.ok) {
      this.throwSchedulerException(response);
    }
    return await response.json();
    if (!response.ok) {
      this.throwSchedulerException(response);
    }
    return await response.json();
  }

  private throwSchedulerException(response: Response) {
    this.logger.error(`Error while calling scheduler: ${response.status}: ${response.statusText}`);
    throw new HttpException(response.statusText, response.status);
  }

  private buildHeader(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }
}
