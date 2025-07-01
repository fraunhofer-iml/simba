/*!
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

export class AutocompleteCompanyFilterConfig {
  translateString: string;
  placeHolderTranslateString: string;

  constructor(translateString: string, placeHolderTranslateString: string) {
    this.translateString = translateString;
    this.placeHolderTranslateString = placeHolderTranslateString;
  }
}
