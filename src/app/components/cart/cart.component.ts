import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/models/dish.model';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';
import { PurchasedDish } from 'src/app/models/purchasedDish.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  dishes!: Dish[];
  total: number = 0;

  constructor(public dishService: DishService,
              public currencyService: CurrencyService,
              private router: Router,
              private authService: AuthService){

  }

  ngOnInit(){
    this.dishes = this.dishService.getSelectedDishes();
    this.getTotal();
  }

  getTotal(){
    this.total = this.dishes.map(d => d.price * (d.maxPerDay - d.remaining)).reduce((sum, current) => sum += current, 0);
  }

  onBuyNow() {
    let purchasedDishes: PurchasedDish[] = [];
    for (let dish of this.dishes){
      const newPurchase: PurchasedDish = {
        userId: this.authService.userData.uid,
        dishId: dish.id ?? "",
        count: dish.maxPerDay - dish.remaining,
        date: new Date()
      }

      purchasedDishes.push(newPurchase)
    }

    this.dishService.buy(purchasedDishes);
    this.router.navigateByUrl("/dish-list")
  }
}
