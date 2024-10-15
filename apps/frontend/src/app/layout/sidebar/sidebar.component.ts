import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'apps/frontend/src/assets/i18n/languages';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTING } from '../../routing/routing.enum';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly ROUTING = ROUTING;
  languages: string[] = [Languages.DE, Languages.EN];
  userName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private translationService: TranslateService
  ) {
    this.userName = authService.getUserName();
  }

  logout() {
    this.authService.logout();
  }

  setLanguage(language: string) {
    this.translationService.use(language);
  }
}
