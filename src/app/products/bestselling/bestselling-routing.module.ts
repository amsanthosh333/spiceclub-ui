import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestsellingComponent } from './bestselling.component';

const routes: Routes = [{ path: '', component: BestsellingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BestsellingRoutingModule { }
