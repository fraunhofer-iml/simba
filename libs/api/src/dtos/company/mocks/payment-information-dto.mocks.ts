/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentInformationSeed } from '@ap3/database';
import { PaymentInformationDto } from '../payment-information.dto';

export const PaymentInformationDtoMocks: PaymentInformationDto[] = [
  new PaymentInformationDto(PaymentInformationSeed[0].id, PaymentInformationSeed[0].IBAN, PaymentInformationSeed[0].BIC),
  new PaymentInformationDto(PaymentInformationSeed[1].id, PaymentInformationSeed[1].IBAN, PaymentInformationSeed[1].BIC),
  new PaymentInformationDto(PaymentInformationSeed[2].id, PaymentInformationSeed[2].IBAN, PaymentInformationSeed[2].BIC),
];
