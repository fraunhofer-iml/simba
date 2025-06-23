/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as util from 'node:util';

export class DateSerializer extends Date {
  [util.inspect.custom]() {
    return `new Date("${this.toISOString()}")`;
  }
}

const date = new DateSerializer();
console.log(util.inspect(date));
