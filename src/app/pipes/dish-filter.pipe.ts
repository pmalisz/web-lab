import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../models/dish.model';

@Pipe({
  name: 'dishFilter',
  pure: false
})
export class DishFilterPipe implements PipeTransform {
  constructor () { }

  transform(value: Dish[], filterBy:string, filterValues: Set<any>): Dish[] {
    if (value.length === 0 || filterValues.size === 0) {
      return value
    }

    value = value.filter((elem:Dish, index:number, array:Dish[]) => {
      for (const filterValue of filterValues) {
        //@ts-ignore
        if (filterValue === elem[filterBy]) {
          return true
        }

        //@ts-ignore
        if (typeof filterValue === "string" && filterValue.includes(elem[filterBy])) {
          return true
        }
      }

      return false
    })
    
    return value;
  }
}
