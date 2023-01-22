import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent {
  dishes:Dish[] = [];
  filterSubscription!:Subscription;
  dishLoadedSubscription!: Subscription;
  maxDishPrice!: number;
  minDishPrice!: number;
  orderedCount!: number;

  dishAttributes = {
    cuisineType: new Set,
    category: new Set,
    price: new Set,
    rate: new Set
  }

  pageSize: number = 8;
  currentPage:number = 1;
  currentPageRange: [number, number] = [
    this.pageSize * (this.currentPage - 1),
     this.pageSize * this.currentPage
    ];

  constructor(public dishService: DishService, public currencyService: CurrencyService, public filterService: FilterService) {

  }

  ngOnInit(){
    this.dishLoadedSubscription = this.dishService.dishesLoaded.subscribe((dishes) => {
      this.dishes = dishes;
    });

    this.getDishPrices();
    
    this.dishService.orderedCount.subscribe(oc => {
      this.orderedCount = oc;
    })

    this.filterSubscription = this.filterService.filterChanged.subscribe(
      (newFilters) => {
        this.dishAttributes = newFilters;
      }
    );
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
    this.dishLoadedSubscription.unsubscribe();
  }

  private getDishPrices() :void {    
    this.maxDishPrice = 0;
    this.minDishPrice = Infinity;
    this.dishes.forEach(dish => {      
      this.minDishPrice = Math.min(this.minDishPrice, dish.price);
      this.maxDishPrice = Math.max(this.maxDishPrice, dish.price);
    });
  }

  isInPage(i:number) {
    return i >= this.currentPageRange[0] && i < this.currentPageRange[1];
  }

  onSwipeRight() {
    this.currentPage += 1;
    this.currentPageRange[0] += this.pageSize;
    this.currentPageRange[1] += this.pageSize;    
  }

  onSwipeLeft() {
    this.currentPage -= 1;
    this.currentPageRange[0] -= this.pageSize;
    this.currentPageRange[1] -= this.pageSize;
  }

  onSelectPageSize() {
    this.pageSize = +this.pageSize; //convert to number because in <option> tag string is being held
    this.currentPageRange = [
    this.pageSize * (this.currentPage - 1),
     this.pageSize * this.currentPage
    ];
  }
}
