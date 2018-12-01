import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  //this menthod will return value, which decides if the route is enabled else navigates to login page
  canActivate() {
    if(!this.authService.isTokenExpired()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
