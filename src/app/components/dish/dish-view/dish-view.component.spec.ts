import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishViewComponent } from './dish-view.component';

describe('DishViewComponent', () => {
  let component: DishViewComponent;
  let fixture: ComponentFixture<DishViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DishViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
