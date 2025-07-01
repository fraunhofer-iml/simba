/*!
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class DateRangeFilterConfig {
  translateString: string;
  placeholderFromTranslateString: string;
  placeholderToTranslateString: string;

  constructor(translateString: string, placeholderFromTranslateString: string, placeholderToTranslateString: string) {
    this.translateString = translateString;
    this.placeholderFromTranslateString = placeholderFromTranslateString;
    this.placeholderToTranslateString = placeholderToTranslateString;
  }
}
