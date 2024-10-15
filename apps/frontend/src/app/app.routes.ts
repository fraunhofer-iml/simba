import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'production',
    loadChildren: () => import('./pages/production/production.module').then((m) => m.ProductionModule),
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/wallet/wallet.module').then((m) => m.WalletModule),
  },
];
