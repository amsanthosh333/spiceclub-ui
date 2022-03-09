import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodaysdealComponent } from './todaysdeal.component';

const routes: Routes = [{ path: '', component: TodaysdealComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodaysdealRoutingModule { }
