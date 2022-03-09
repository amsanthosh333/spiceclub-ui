import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorelocationComponent } from './storelocation.component';

const routes: Routes = [{ path: '', component: StorelocationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorelocationRoutingModule { }
