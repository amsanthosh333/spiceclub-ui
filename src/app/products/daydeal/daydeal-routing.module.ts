import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaydealComponent } from './daydeal.component';

const routes: Routes = [{ path: '', component: DaydealComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaydealRoutingModule { }
