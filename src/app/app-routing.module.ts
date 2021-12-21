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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
