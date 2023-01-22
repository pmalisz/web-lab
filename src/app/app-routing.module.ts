import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { DishAddComponent } from './components/dish/dish-add/dish-add.component';
import { DishViewComponent } from './components/dish/dish-view/dish-view.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "dish-list", component: DishListComponent},
  {path: "dish-view/:id", component: DishViewComponent},
  {path: "dish-add", component: DishAddComponent},
  {path: "cart", component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
