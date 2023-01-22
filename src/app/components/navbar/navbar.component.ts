import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {

  }

  navToMainMenu(){
    this.router.navigateByUrl('');
  }

  navToMenu(){
    this.router.navigateByUrl('/dish-list');
  }

  navToDishForm(){
    this.router.navigateByUrl('/dish-add');
  }

  navToCart(){
    this.router.navigateByUrl('/cart');
  }
}
