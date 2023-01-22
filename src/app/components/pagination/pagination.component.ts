import { Component } from '@angular/core';
import { ReCaptchaEnterpriseProvider } from 'firebase/app-check';
import { Subscription } from 'rxjs';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  subscriptions: Subscription;
  pageSize!: number;
  currentPage!:number;
  itemsCount!: number;

  constructor(private paginationService: PaginationService) {
    this.subscriptions = new Subscription()
  }

  ngOnInit(){
    this.subscriptions.add(this.paginationService.currentPageSubject.subscribe(currentPage => {
      this.currentPage = currentPage;
    }))

    this.subscriptions.add(this.paginationService.pageSizeSubject.subscribe(pageSize => {
      this.pageSize = pageSize;
    }))

    this.subscriptions.add(this.paginationService.itemsCountSubject.subscribe(itemsCount => {
      this.itemsCount = itemsCount;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSwipeRight() {
    this.paginationService.swipeRight();  
  }

  onSwipeLeft() {
    this.paginationService.swipeLeft();
  }

  onSelectPageSize() {
    this.paginationService.setPageSize(this.pageSize);
  }
}
