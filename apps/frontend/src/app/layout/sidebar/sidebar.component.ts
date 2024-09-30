import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ROUTING } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly ROUTING = ROUTING;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.changeStatus();
    this.router.navigate([ROUTING.login]);
  }
}
