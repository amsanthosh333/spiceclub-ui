import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewarrivalComponent } from './newarrival.component';

const routes: Routes = [{ path: '', component: NewarrivalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewarrivalRoutingModule { }
