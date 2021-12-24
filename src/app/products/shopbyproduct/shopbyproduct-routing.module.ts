import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopbyproductComponent } from './shopbyproduct.component';

const routes: Routes = [{ path: '', component: ShopbyproductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopbyproductRoutingModule { }
