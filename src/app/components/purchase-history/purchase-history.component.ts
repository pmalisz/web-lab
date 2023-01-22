import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';

export interface ViewModel {
  name:string,
  count:number,
  price:number,
  seconds:number
}

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent {
  purchases: ViewModel[] = [];
  subscriptions: Subscription;

  constructor(private dishService: DishService,
              public currencyService: CurrencyService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(){
    this.subscriptions.add(this.dishService.purchasedDishesSubject.subscribe(purchases => {
      for (let purchase of purchases){
        const viewModel: ViewModel = {
          name: this.dishService.getDishName(purchase.dishId),
          count: purchase.count,
          price: this.dishService.getDishPrice(purchase.dishId) * purchase.count,
          //@ts-ignore
          seconds: purchase.date['seconds']
        };

        this.purchases.push(viewModel);
      }

      this.purchases = this.purchases.sort((a, b) => {
        return b.seconds - a.seconds;
      });
    }));
  }
}
