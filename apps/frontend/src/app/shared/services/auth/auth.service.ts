import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private status: boolean;

  constructor() {
    this.status = false;
  }

  changeStatus() {
    this.status = !this.status;
  }
  isLoggedIn() {
    return this.status;
  }
}
