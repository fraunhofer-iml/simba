import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)},
    {path: 'login',loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)}

]
    