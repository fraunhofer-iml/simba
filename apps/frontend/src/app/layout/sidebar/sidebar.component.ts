import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Languages } from '../../../assets/i18n/languages';
import { ROUTING } from '../../routing/routing.enum';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly ROUTING = ROUTING;
  userRole;
  userName;
  languages = [
    { label: Languages.DE, img: Languages.DEIMG },
    { label: Languages.EN, img: Languages.ENIMG },
  ];

  constructor(
    private authService: AuthService,
    private translationService: TranslateService
  ) {
    this.userName = authService.getUserName();
    this.userRole = authService.getCurrentlyLoggedInUserRole();
  }

  logout() {
    this.authService.logout();
  }

  setLanguage(language: string) {
    this.translationService.use(language);
  }
}
