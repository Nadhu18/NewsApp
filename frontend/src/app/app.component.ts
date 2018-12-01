import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './modules/news/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  searchTerm = "";

  constructor(private router: Router, private authService: AuthService) {}
 
  searchNews(): void {
    if (this.searchTerm) {
      this.router.navigate(['/news/search', this.searchTerm]);
    }
  }

  //this is written to hide the navbar in login page
  showNavBar() {
    return !this.authService.isTokenExpired();
  }

  //to logout the user by clearing token
  logOut() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }
}
