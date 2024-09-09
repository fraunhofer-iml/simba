import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { WalletModule } from './pages/wallet/wallet.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { OrdersModule } from './pages/orders/orders.module';
import { AppComponent } from './app.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './pages/login/login.module';
import { appRoutes } from './app.routes';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthService } from './shared/services/auth/auth.service';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    LayoutModule,
    WalletModule,
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    OrdersModule,
    RouterModule.forRoot(appRoutes),
    LoginModule,
    CountdownModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
