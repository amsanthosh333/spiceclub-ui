import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthdealComponent } from './monthdeal.component';

const routes: Routes = [{ path: '', component: MonthdealComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthdealRoutingModule { }
