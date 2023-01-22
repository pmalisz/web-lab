import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dish-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.css']
})
export class DishEditComponent {
  dishes!: Dish[];
  subscriptions: Subscription;

  constructor(private dishService: DishService, public currencyService: CurrencyService, private router: Router) {
    this.subscriptions = new Subscription();
  }

  ngOnInit() {
    this.subscriptions.add(this.dishService.dishesSubject.subscribe(dishes => {
      this.dishes = dishes;
    }));
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  editDish(dish: Dish){
    this.router.navigate(['dish-form', dish.id]);
  }

  deleteDish(dish: Dish){
    this.dishService.removeDish(dish);
  }
}
