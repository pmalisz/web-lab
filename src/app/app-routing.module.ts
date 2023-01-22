import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { DishViewComponent } from './components/dish/dish-view/dish-view.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';

import { AuthGuard } from './guard/auth.guard';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ManagerGuard } from './guard/manager.guard';
import { AdminGuard } from './guard/admin.guard';
import { DishEditComponent } from './components/dish/dish-edit/dish-edit.component';
import { DishFormComponent } from './components/dish/dish-edit/dish-form/dish-form.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: "dish-list", component: DishListComponent},
  {path: "dish-view/:id", component: DishViewComponent, canActivate: [AuthGuard]},
  {path: "dish-edit", component: DishEditComponent, canActivate: [ManagerGuard]},
  {path: "dish-form", component: DishFormComponent, canActivate: [ManagerGuard]},
  {path: "dish-form/:id", component: DishFormComponent, canActivate: [ManagerGuard]},
  {path: "purchase-history", component: PurchaseHistoryComponent, canActivate: [AuthGuard]},
  {path: "cart", component: CartComponent, canActivate: [AuthGuard]},
  {path: "admin-panel", component: AdminPanelComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
