import { Component } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  dishes!: Dish[];
  total: number = 0;

  constructor(public dishService: DishService, public currencyService: CurrencyService){

  }

  ngOnInit(){
    this.dishes = this.dishService.getSelectedDishes();
    this.getTotal();
  }

  getTotal(){
    this.total = this.dishes.map(d => d.price * (d.maxPerDay - d.remaining)).reduce((sum, current) => sum += current, 0);
  }
}
