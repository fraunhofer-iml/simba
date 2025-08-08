/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { companiesSeed } from '../../../../seed/companies.seed';

export const getCompanyByIdQueryMock = {
  where: { id: companiesSeed[0].id },
  include: {
    paymentInformation: true,
  },
};
