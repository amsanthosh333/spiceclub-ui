import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BestsellersComponent } from './products/bestsellers/bestsellers.component';
import { CategoryComponent } from './products/category/category.component';

const routes: Routes = [
  { path :'', redirectTo:'/home',pathMatch:'full'},

  // { path :'login',component:LoginComponent},
  { path :'home',component:HomeComponent},
  { path :'login',component:LoginComponent},
  { path :'category',component:CategoryComponent},
  { path :'bestseller',component:BestsellersComponent},
  { path: 'bestselling', loadChildren: () => import('./products/bestselling/bestselling.module').then(m => m.BestsellingModule) },
  { path: 'shopbyproduct', loadChildren: () => import('./products/shopbyproduct/shopbyproduct.module').then(m => m.ShopbyproductModule) },
  { path: 'productdetail', loadChildren: () => import('./products/productdetail/productdetail.module').then(m => m.ProductdetailModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
