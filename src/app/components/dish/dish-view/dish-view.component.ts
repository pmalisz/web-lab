import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { AuthService } from 'src/app/services/auth.service';
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
  canRate: boolean = false;
  subscriptions: Subscription;

  constructor(public dishService: DishService,
              public currencyService: CurrencyService,
              private route:ActivatedRoute,
              private authService: AuthService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(){
     this.subscriptions.add(this.dishService.dishesSubject.subscribe(
      (dishes: Dish[]) => {        
        this.dish = this.dishService.getDish(this.route.snapshot.params["id"]);     
        this.imgUrl = this.dish.imgUrls[0];
        this.imgUrlIdx = 0;
      }));

      this.subscriptions.add(this.dishService.purchasedDishesSubject.subscribe(dishes => {
        if (dishes.filter(d => d.dishId === this.route.snapshot.params["id"]).length > 0 && !this.authService.user?.banned)
          this.canRate = true;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

  changeRate(){
    this.dishService.changeRate(this.dish);
  }
}
