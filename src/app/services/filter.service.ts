import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  @Output() filterChanged = new EventEmitter();
  selectedDishAttributes:any;
  convertedSelectedDishAttributes:any;

  constructor() { }

  ngOnInit(): void {
    this.selectedDishAttributes = {
      cuisineType: [],
      category: [],
      price: [],
      rate: []
    }
  }

  onAttributesChange() {
    this.convertedSelectedDishAttributes = this.convertToFiltersList(this.selectedDishAttributes);
    this.filterChanged.emit(this.convertedSelectedDishAttributes);
  }

  convertToFiltersList(attributesList: typeof this.selectedDishAttributes){
    let outputArrays = {}
    for (let key in attributesList) {
      //@ts-ignore
      outputArrays[key] = new Set();
      for (let obj of attributesList[key]){
        //@ts-ignore
        outputArrays[key].add(obj.item_content)
      }
    }
    return outputArrays;
  }
}
