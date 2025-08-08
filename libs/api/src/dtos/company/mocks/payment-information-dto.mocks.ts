/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { paymentInformationSeed } from '@ap3/database';
import { PaymentInformationDto } from '../payment-information.dto';

export const paymentInformationDtoMocks: PaymentInformationDto[] = [
  new PaymentInformationDto(paymentInformationSeed[0].id, paymentInformationSeed[0].IBAN, paymentInformationSeed[0].BIC),
  new PaymentInformationDto(paymentInformationSeed[1].id, paymentInformationSeed[1].IBAN, paymentInformationSeed[1].BIC),
  new PaymentInformationDto(paymentInformationSeed[2].id, paymentInformationSeed[2].IBAN, paymentInformationSeed[2].BIC),
];
