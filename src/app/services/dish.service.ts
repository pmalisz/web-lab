import { Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MockData } from '../models/mock.model';
import { PurchasedDish } from '../models/purchasedDish.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  dishes:Dish[] = []
  dishesSubject: BehaviorSubject<Dish[]>;
  purchasedDishes: PurchasedDish[] = [];
  purchasedDishesSubject: BehaviorSubject<PurchasedDish[]>;
  counter = 0;
  orderedCount: BehaviorSubject<number>;

  constructor(private store: AngularFirestore, private authService: AuthService) { 
    this.orderedCount = new BehaviorSubject(this.counter);
    this.dishesSubject = new BehaviorSubject(this.dishes);
    this.purchasedDishesSubject = new BehaviorSubject(this.purchasedDishes);
    
    this.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
      this.dishesSubject.next(this.dishes)

      // for debug
      if(this.dishes.length === 0){
        MockData.fillDishesStore(this.store);
      }
    });

    this.getPurchasedDishes().subscribe((purchasedDishes) => {
      this.purchasedDishes = purchasedDishes.filter(d => d.userId === this.authService.userData.uid);
      this.purchasedDishesSubject.next(this.purchasedDishes)
    });
  }

  getDishes(): Observable<Dish[]>{
    return this.store.collection('dishes').valueChanges({ idField: 'id' }) as Observable<Dish[]>;
  }

  getPurchasedDishes(): Observable<PurchasedDish[]>{
    return this.store.collection('purchased_dishes').valueChanges({ idField: 'id' }) as Observable<PurchasedDish[]>;
  }

  getSelectedDishes() :Dish[]{
    return this.dishes.filter(d => d.maxPerDay > d.remaining)
  }

  getDishName(id: string): string{
    const dish = this.dishes.filter(d => d.id === id);
    if(dish[0])
      return dish[0].name;

    return '';
  }

  getDishPrice(id: string): number{
    const dish = this.dishes.filter(d => d.id === id);
    if(dish[0])
      return dish[0].price;

    return 0;
  }

  substractFromDish(dish: Dish){
    let index = this.dishes.indexOf(dish);
    if (index !== -1)
      this.dishes[index].remaining--;

    this.orderedCount.next(++this.counter);
  }

  addToDish(dish: Dish){
    let index = this.dishes.indexOf(dish);
    if (index !== -1)
      this.dishes[index].remaining++;
    
    this.orderedCount.next(--this.counter);
  }

  removeDish(dish: Dish) {
    this.dishes = this.dishes.filter(d => d.id !== dish.id);
    this.dishesSubject.next(this.dishes)

    let purchased = this.purchasedDishes.filter(pd => pd.dishId == dish.id);
    for (let purchasedDish of purchased){
      this.purchasedDishes = this.purchasedDishes.filter(d => d.id !== purchasedDish.id);
      this.store.collection('purchased_dishes').doc(purchasedDish.id).delete();
    }
    this.purchasedDishesSubject.next(this.purchasedDishes);

    this.store.collection('dishes').doc(dish.id).delete();
  }

  addDish(dish: Dish) {
    this.store.collection('dishes').add(dish);

    this.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
      this.dishesSubject.next(this.dishes);
    });
  }

  editDish(dish: Dish) {
    this.store.collection('dishes').doc(dish.id).update(dish);

    this.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
      this.dishesSubject.next(this.dishes);
    });
  }

  getDish(id: string): Dish {
    //@ts-ignore
    return this.dishes.find(p => p.id === id);
  }

  changeRate(dish: Dish) {
    this.store.collection('dishes').doc(dish.id).update({rate: dish.rate});
  }

  buy(dishes: PurchasedDish[]) {
    this.counter = 0;
    this.orderedCount.next(this.counter);
    for (let dish of dishes) {
      this.store.collection('purchased_dishes').add(dish);

      let ramaining = this.dishes.filter(d => d.id == dish.dishId)[0].remaining;
      this.store.collection('dishes').doc(dish.dishId).update({maxPerDay: ramaining});
      this.store.collection('dishes').doc(dish.dishId).update({remaining: ramaining});
    }

    this.getPurchasedDishes().subscribe((purchasedDishes) => {
      this.purchasedDishes = purchasedDishes.filter(d => d.userId === this.authService.userData.uid);
      this.purchasedDishesSubject.next(this.purchasedDishes);
    });
  }
}
