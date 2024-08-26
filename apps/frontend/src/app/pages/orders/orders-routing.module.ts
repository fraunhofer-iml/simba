import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersOverviewComponent } from './orders-overview/orders-overview.component';
import { CreateOrderComponent } from './create-order/create-order.component';

const routes: Routes = [{path:'', redirectTo: 'orders',pathMatch: 'prefix'},
  {path: '', component: OrdersOverviewComponent}, {
  path: 'new', component: CreateOrderComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
