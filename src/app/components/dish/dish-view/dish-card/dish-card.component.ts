import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/models/dish.model';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.css']
})
export class DishCardComponent {
  @Input() dish!: Dish;
  @Input() hasMinPrice!: boolean;
  @Input() hasMaxPrice!: boolean;
  @Input() isEditable: boolean = true;

  constructor(public dishService: DishService, public currencyService: CurrencyService, private router: Router) {

  }

  navToDishView(){   
    this.router.navigate(['dish-view', this.dish.id])
  }

  addToOrder(dish: Dish){
    this.dishService.substractFromDish(dish);
  }

  subFromOrder(dish: Dish){
    this.dishService.addToDish(dish);
    console.log(this.dish.id);
  }

  deleteDish(dish: Dish) {
    this.dishService.removeDish(dish);
  }
}
