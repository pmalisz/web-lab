import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './components/cart/cart.component';
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { DishViewComponent } from './components/dish/dish-view/dish-view.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CurrencyComponent } from './components/navbar/currency/currency.component';
import { DishCardComponent } from './components/dish/dish-view/dish-card/dish-card.component';
import { DishFilterComponent } from './components/dish/dish-list/dish-filter/dish-filter.component';
import { DishFilterPipe } from './pipes/dish-filter.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { UserComponent } from './components/user/user.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { DishEditComponent } from './components/dish/dish-edit/dish-edit.component';
import { DishFormComponent } from './components/dish/dish-edit/dish-form/dish-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CartComponent,
    DishListComponent,
    DishFilterComponent,
    DishViewComponent,
    DishCardComponent,
    AdminPanelComponent,
    CurrencyComponent,
    DishFilterPipe,
    PaginationComponent,
    PurchaseHistoryComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    DishEditComponent,
    DishFormComponent
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
    AngularFirestoreModule,
    MdbCollapseModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
