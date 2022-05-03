import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribedprodComponent } from './subscribedprod.component';

const routes: Routes = [{ path: '', component: SubscribedprodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribedprodRoutingModule { }
