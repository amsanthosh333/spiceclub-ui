import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderstrackComponent } from './orderstrack.component';

const routes: Routes = [{ path: '', component: OrderstrackComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderstrackRoutingModule { }
