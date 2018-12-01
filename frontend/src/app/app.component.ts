import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  searchTerm = "";

  constructor(private router: Router) {}

  searchNews(): void {
    if (this.searchTerm) {
      this.router.navigate(['/news/search', this.searchTerm]);
    }
  }
}
