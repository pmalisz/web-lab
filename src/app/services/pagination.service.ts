import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  pageSize: number = 8;
  pageSizeSubject: BehaviorSubject<number>;
  currentPage:number = 1;
  currentPageSubject: BehaviorSubject<number>;
  itemsCount: number = 0;
  itemsCountSubject: BehaviorSubject<number>;

  constructor() { 
    this.pageSizeSubject = new BehaviorSubject(this.pageSize);
    this.currentPageSubject = new BehaviorSubject(this.currentPage);
    this.itemsCountSubject = new BehaviorSubject(this.itemsCount);
  }

  swipeRight() {
    this.currentPageSubject.next(++this.currentPage);
  }

  swipeLeft() {
    this.currentPageSubject.next(--this.currentPage);
  }

  setPageSize(pageSize: number) {
    this.pageSize = +pageSize;
    this.pageSizeSubject.next(this.pageSize);
  }

  setItemsCount(itemsCount: number) {
    this.itemsCount = itemsCount;
    this.itemsCountSubject.next(this.itemsCount);
  }
}
