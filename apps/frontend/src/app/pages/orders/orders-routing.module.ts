import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { RoleGuard } from '../../guards/role/role.guard';
import { USERROLES } from '../../shared/constants/user-roles';
import { CreateOrderComponent } from './create-order/create-order.component';
import { OrdersOverviewComponent } from './orders-overview/orders-overview.component';

const routes: Routes = [
  { path: '', component: OrdersOverviewComponent, canActivate: [AuthGuard] },
  {
    path: 'new',
    component: CreateOrderComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [USERROLES.CUSTOMER] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
