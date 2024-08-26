import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor( private authservice: AuthService, private router:Router){}

  routeToLayout(){
    this.authservice.changeStatus();
    this.router.navigate([''])
  }
}
