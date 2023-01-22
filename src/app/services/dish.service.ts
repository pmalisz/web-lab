import { Injectable } from '@angular/core';
import { Dish } from '../models/dish.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MockData } from '../models/mock.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  dishes:Dish[] = []
  dishesLoaded = new BehaviorSubject<Dish[]>([]);
  counter = 0;
  orderedCount: BehaviorSubject<number>;

  constructor(private store: AngularFirestore) { 
    this.orderedCount = new BehaviorSubject(this.counter);
    this.dishesLoaded = new BehaviorSubject(this.dishes);

    this.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
      this.dishesLoaded.next(this.dishes)

      // for debug
      if(this.dishes.length === 0){
        MockData.fillDishesStore(this.store);
      }
    })
  }

  getDishes(): Observable<Dish[]>{
    return this.store.collection('dishes').valueChanges({ idField: 'id' }) as Observable<Dish[]>;
  }

  getSelectedDishes() :Dish[]{
    return this.dishes.filter(d => d.maxPerDay > d.remaining)
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
    this.dishesLoaded.next(this.dishes)

    this.store.collection('dishes').doc(dish.id).delete();
  }

  addDish(dish: Dish) {
    this.store.collection('dishes').add(dish);

    this.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
      this.dishesLoaded.next(this.dishes);
    });
  }

  getDish(id: string): Dish {
    //@ts-ignore
    return this.dishes.find(p => p.id === id);
  }
}
