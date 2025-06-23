/*
 * Copyright Fraunhofer Institute for Material Flow and Logistics
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * For details on the licensing terms, see the LICENSE file.
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserRoles } from '@ap3/util';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { RoleGuard } from '../../guards/role/role.guard';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersOverviewComponent } from './orders-overview/orders-overview.component';

const routes: Routes = [
  { path: '', component: OrdersOverviewComponent, canActivate: [AuthGuard] },
  {
    path: 'new',
    component: CreateOrderComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRoles.CUSTOMER] },
  },
  {
    path: ':id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
