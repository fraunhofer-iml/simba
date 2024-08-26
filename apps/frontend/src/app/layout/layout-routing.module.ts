import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthGuard } from '../guards/auth/auth.guard';

const routes: Routes = [
  {path:'',canActivate:[AuthGuard],component: SidebarComponent,children:[
    {path: 'orders', loadChildren: () => import('../pages/orders/orders.module').then(m => m.OrdersModule)},
    {path: 'production', loadChildren: () => import('../pages/production/production.module').then(m => m.ProductionModule)},
    {path: 'wallet', loadChildren: () => import('../pages/wallet/wallet.module').then(m => m.WalletModule)}]}]

@NgModule({  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }