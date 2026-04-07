import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  fullName = 'Nguyen Van A';
  age = 25;

  constructor(private router: Router) {}

  sayHello() {
    alert('Bạn đã click button');
  }

  isLoggedIn() {
    return typeof window !== 'undefined' && localStorage.getItem('token') !== null;
  }

  getUserInfo() {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr && userStr !== 'undefined') {
        try {
          return JSON.parse(userStr);
        } catch (error) {
          return null;
        }
      }
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
