import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ROUTING } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor( private authService: AuthService, private router:Router){}

  routeToLayout(){
    this.authService.changeStatus();
    this.router.navigate([ROUTING.orders]);
  }
}
