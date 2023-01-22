import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Dish } from 'src/app/models/dish.model';
import { DishService } from 'src/app/services/dish.service';
import { FilterService } from 'src/app/services/filter.service';

interface dropdownListObject {
  cuisineType: any,
  category: any,
  price: any,
  rate: any
}

@Component({
  selector: 'app-dish-filter',
  templateUrl: './dish-filter.component.html',
  styleUrls: ['./dish-filter.component.css']
})
export class DishFilterComponent {
  dropdownListsObj: dropdownListObject = {
    cuisineType: [],
    price: [],
    rate: [],
    category: []
  };
  selectedItemsObj: dropdownListObject= {
    cuisineType: [],
    price: [],
    rate: [],
    category: []
  };
  dropdownSettings: IDropdownSettings = {};

  constructor(public filterService: FilterService, private dishService: DishService) { }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField : "item_content",
      itemsShowLimit: 5,
      allowSearchFilter: true,
    }
    
    this.dishService.dishesSubject.subscribe(dishes => {
      this.updateObjects(dishes);
    })
  }

  private updateObjects(dishes:Dish[]) {
    for (let key in this.dropdownListsObj) {
      //@ts-ignore
      this.dropdownListsObj[key] = []
      for (const dish of dishes) {
        //@ts-ignore
        if (dish[key] === '') {
          continue
        }

        //@ts-ignore
        if (this.dropdownListsObj[key].some(o => o.item_content === dish[key])) {
          continue
        }

        //@ts-ignore
        this.dropdownListsObj[key].push({item_id : dish.id, item_content: dish[key]});
      }
      //sorting possible values
      //@ts-ignore
      this.dropdownListsObj[key].sort((e1, e2) => {
        return e1.item_content > e2.item_content ? 1 : e1.item_content < e2.item_content ? -1 : 0; 
      })
    }
  }

  onFilterChange(item: any) {    
    this.filterService.selectedDishAttributes = this.selectedItemsObj;    
    this.filterService.onAttributesChange();
  }

  getData(key: string) {
    //@ts-ignore
    return this.dropdownListsObj[key];
  }

  getSelected(key: string){
    //@ts-ignore
    return this.selectedItemsObj[key];
  }
}
