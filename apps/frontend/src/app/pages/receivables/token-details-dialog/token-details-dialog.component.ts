/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateService } from '@ngx-translate/core';
import { TokenReadDto } from 'nft-folder-blockchain-connector-besu';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Component, Input, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvoiceService } from '../../../shared/services/invoices/invoices.service';
import { FormatService } from '../../../shared/services/util/format.service';

@Component({
  selector: 'app-token-details',
  templateUrl: './token-details-dialog.component.html',
  styleUrl: './token-details-dialog.component.scss',
})
export class TokenDetailsDialogComponent implements OnChanges {
  invoiceNft$: Observable<TokenReadDto>;
  additionalData: Map<string, any> | null = null;
  @Input() invoiceNumber = '';
  constructor(
    public formatService: FormatService,
    private readonly snackBar: MatSnackBar,
    private readonly translateService: TranslateService,
    private readonly invoiceService: InvoiceService
  ) {
    this.invoiceNft$ = of();
  }

  ngOnChanges(): void {
    this.invoiceNft$ = this.invoiceService.getNftByInvoiceNumber(this.invoiceNumber).pipe(
      tap((tokenDto: TokenReadDto) => {
          this.processAdditionalInformation(tokenDto);
      }),
      catchError((err) => {
        this.snackBar.open(
          this.translateService.instant('Error.NftFailed'),
          this.translateService.instant('CloseSnackBarAction')
        );
        return throwError(() => err);
      })
    );
  }

  processAdditionalInformation(dto: TokenReadDto) {
    let parsedAdditionalInformation = {};
    try {
      parsedAdditionalInformation = JSON.parse(dto.additionalData);
    } catch (error) {
      throw new Error('Failed parsing additional Information' + error);
    }
    this.additionalData = new Map<string, any>(Object.entries(parsedAdditionalInformation));
  }
}
