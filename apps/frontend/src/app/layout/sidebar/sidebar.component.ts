/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslateService } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import { ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Languages } from '../../../assets/i18n/languages';
import { ROUTING } from '../../routing/routing.enum';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly ROUTING = ROUTING;
  userRole;
  userName;
  titleLogoUrl = environment.SIMBA_LOGO_URL;
  subLogoOne = environment.SIDEBAR_SUB_LOGO_ONE;
  subLogoTwo = environment.SIDEBAR_SUB_LOGO_TWO;
  languages = [
    { label: Languages.DE, img: Languages.DEIMG },
    { label: Languages.EN, img: Languages.ENIMG },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly translationService: TranslateService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.userName = authService.getUserName();
    this.userRole = authService.getCurrentlyLoggedInUserRole();
  }

  logout() {
    this.authService.logout();
  }

  setLanguage(language: string) {
    this.translationService.use(language);
    registerLocaleData(language === Languages.DE ? localeDe : localeEn);
    this.cdr.detectChanges();
  }
}
