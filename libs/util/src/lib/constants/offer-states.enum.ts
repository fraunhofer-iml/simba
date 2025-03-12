/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export enum OfferStatesEnum {
  OPEN = 'Open',
  ACCEPTED = 'Accepted',
  REFUSED = 'Refused',
  EXPIRED = 'Expired',
}

export const OFFER_STATES_TO_SHOW: string[] = [OfferStatesEnum.OPEN, OfferStatesEnum.ACCEPTED];
