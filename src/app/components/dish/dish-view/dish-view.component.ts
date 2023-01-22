import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dish-view',
  templateUrl: './dish-view.component.html',
  styleUrls: ['./dish-view.component.css']
})
export class DishViewComponent {
  imgUrl!: string;
  imgUrlIdx!: number;
  dish!: Dish;
  dishesLoadedSubscription!: Subscription;

  constructor(public dishService: DishService, public currencyService: CurrencyService, private route:ActivatedRoute) {

  }

  ngOnInit(){
    this.dishesLoadedSubscription = this.dishService.dishesLoaded.subscribe(
      (dishes: Dish[]) => {        
        this.dish = this.dishService.getDish(this.route.snapshot.params["id"]);     
        this.imgUrl = this.dish.imgUrls[0];
        this.imgUrlIdx = 0;
      });
  }

  ngOnDestroy(): void {
    this.dishesLoadedSubscription.unsubscribe();
  }

  next(){
    if(this.imgUrlIdx == (this.dish.imgUrls.length - 1)){
      this.imgUrlIdx = -1;
    }

    this.imgUrl = this.dish.imgUrls[++this.imgUrlIdx];
  }

  prev(){
    if(this.imgUrlIdx == 0){
      this.imgUrlIdx = this.dish.imgUrls.length;
    }

    this.imgUrl = this.dish.imgUrls[--this.imgUrlIdx];
  }

  addToOrder(dish: Dish){
    this.dishService.substractFromDish(dish);
  }

  subFromOrder(dish: Dish){
    this.dishService.addToDish(dish);
    console.log(this.dish.id);
  }
}
