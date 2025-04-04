/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Route } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { PATH } from './routing/path.enum';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: PATH.orders,
    pathMatch: 'full',
  },
  {
    path: PATH.orders,
    loadChildren: () => import('./pages/orders/orders.module').then((m) => m.OrdersModule),
    canActivate: [AuthGuard],
  },
  {
    path: PATH.production,
    loadChildren: () => import('./pages/production/production.module').then((m) => m.ProductionModule),
    canActivate: [AuthGuard],
  },
  {
    path: PATH.receivables,
    loadChildren: () => import('./pages/receivables/receivables.module').then((m) => m.ReceivablesModule),
    canActivate: [AuthGuard],
  },
  {
    path: PATH.imprint,
    component: ImprintComponent,
  },
  {
    path: PATH.privacyPolicy,
    component: PrivacyPolicyComponent,
  },
];
