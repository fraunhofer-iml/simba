/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentInformation } from '@prisma/client';

export class PaymentInformationAmqpDto {
  id: string;
  iBAN: string;
  BIC: string;

  constructor(id: string, iBAN: string, BIC: string) {
    this.id = id;
    this.iBAN = iBAN;
    this.BIC = BIC;
  }

  public static fromEntities(paymentInformations: PaymentInformation[]): PaymentInformationAmqpDto[] {
    const paymentInformationsAMQP: PaymentInformationAmqpDto[] = [];
    for (const pI of paymentInformations) {
      paymentInformationsAMQP.push(PaymentInformationAmqpDto.fromEntity(pI));
    }
    return paymentInformationsAMQP;
  }

  public static fromEntity(paymentInformation: PaymentInformation): PaymentInformationAmqpDto {
    return <PaymentInformationAmqpDto>{
      id: paymentInformation.id,
      iBAN: paymentInformation.IBAN,
      BIC: paymentInformation.BIC,
    };
  }
}
