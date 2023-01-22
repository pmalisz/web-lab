import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, public authService: AuthService) {

  }

  navToMainMenu() {
    this.router.navigateByUrl('');
  }

  navToMenu() {
    this.router.navigateByUrl('/dish-list');
  }

  navToDishForm() {
    this.router.navigateByUrl('/dish-add');
  }

  navToPurchaseHistory() {
    this.router.navigateByUrl('/purchase-history');
  }

  navToCart() {
    this.router.navigateByUrl('/cart');
  }

  navToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }

  navToSignUp() {
    this.router.navigateByUrl('/sign-up');
  }

  navToAdminPanel() {
    this.router.navigateByUrl('/admin-panel');
  }
}
