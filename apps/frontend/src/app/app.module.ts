import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { CountdownModule } from 'ngx-countdown';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpLoaderFactory } from './app.config';
import { appRoutes } from './app.routes';
import { AuthGuard } from './guards/auth/auth.guard';
import { initializeKeycloak } from './keycloak-initializer';
import { LayoutModule } from './layout/layout.module';
import { OrdersModule } from './pages/orders/orders.module';
import { WalletModule } from './pages/wallet/wallet.module';
import { AuthService } from './shared/services/auth/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    WalletModule,
    RouterOutlet,
    BrowserModule,
    BrowserAnimationsModule,
    OrdersModule,
    RouterModule.forRoot(appRoutes),
    CountdownModule,
    KeycloakAngularModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LayoutModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    AuthGuard,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
