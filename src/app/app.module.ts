import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './components/cart/cart.component';
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { DishAddComponent } from './components/dish/dish-add/dish-add.component';
import { DishViewComponent } from './components/dish/dish-view/dish-view.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CurrencyComponent } from './components/navbar/currency/currency.component';
import { CommonModule } from '@angular/common';
import { DishCardComponent } from './components/dish/dish-view/dish-card/dish-card.component';
import { DishFilterComponent } from './components/dish/dish-list/dish-filter/dish-filter.component';
import { DishFilterPipe } from './pipes/dish-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CartComponent,
    DishListComponent,
    DishFilterComponent,
    DishAddComponent,
    DishViewComponent,
    DishCardComponent,
    AdminPanelComponent,
    CurrencyComponent,
    DishFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgbRatingModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
