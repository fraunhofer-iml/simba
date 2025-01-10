import { Route } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
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
];
