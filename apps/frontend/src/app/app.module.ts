/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { CountdownModule } from 'ngx-countdown';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpLoaderFactory } from './app.config';
import { appRoutes } from './app.routes';
import { initializeKeycloak } from './keycloak-initializer';
import { LayoutModule } from './layout/layout.module';
import { AuthService } from './shared/services/auth/auth.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorService } from './shared/services/util/paginator.service';

registerLocaleData(localeDe);
registerLocaleData(localeEn);

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule,
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    CountdownModule,
    KeycloakAngularModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LayoutModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (translate: TranslateService) => translate.currentLang || 'de',
      deps: [TranslateService],
    },
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    provideHttpClient(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
    { provide: MatPaginatorIntl, useClass: PaginatorService }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
