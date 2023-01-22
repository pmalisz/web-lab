import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { AuthService } from 'src/app/services/auth.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';
import { FilterService } from 'src/app/services/filter.service';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent {
  dishes!: Dish[];
  dishesOnPage!: Dish[];
  subscriptions: Subscription;
  maxDishPrice!: number;
  minDishPrice!: number;
  orderedCount!: number;

  pageSize!: number;
  currentPage!:number;

  dishAttributes = {
    cuisineType: new Set,
    category: new Set,
    price: new Set,
    rate: new Set
  }

  constructor(private dishService: DishService, 
              public currencyService: CurrencyService, 
              private filterService: FilterService, 
              public paginationService: PaginationService,
              public authService: AuthService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(){
    this.subscriptions.add(this.dishService.dishesSubject.subscribe(dishes => {
      this.dishes = dishes;
      this.setDishesOnPage();
      this.getDishPrices();
      this.paginationService.setItemsCount(this.dishes.length);
    }));
    
    this.subscriptions.add(this.dishService.orderedCount.subscribe(oc => {
      this.orderedCount = oc;
    }));

    this.subscriptions.add(this.filterService.filterChanged.subscribe(newFilters => {
        this.dishAttributes = newFilters;
      }
    ));

    this.subscriptions.add(this.paginationService.currentPageSubject.subscribe(currentPage => {
      this.currentPage = currentPage;
      this.setDishesOnPage();
    }))

    this.subscriptions.add(this.paginationService.pageSizeSubject.subscribe(pageSize => {
      this.pageSize = pageSize;
      this.setDishesOnPage();
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getDishPrices() :void {    
    this.maxDishPrice = 0;
    this.minDishPrice = Infinity;
    this.dishes.forEach(dish => {      
      this.minDishPrice = Math.min(this.minDishPrice, dish.price);
      this.maxDishPrice = Math.max(this.maxDishPrice, dish.price);
    });
  }

  private setDishesOnPage(){
    this.dishesOnPage = this.dishes.filter((_, idx) => idx >= (this.currentPage-1)*this.pageSize);
    this.dishesOnPage = this.dishesOnPage.filter((u, i) => i < this.pageSize);
  }
}
