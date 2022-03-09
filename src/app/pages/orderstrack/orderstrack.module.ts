import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderstrackRoutingModule } from './orderstrack-routing.module';
import { OrderstrackComponent } from './orderstrack.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    OrderstrackComponent
  ],
  imports: [
    CommonModule,
    OrderstrackRoutingModule,NgxSkeletonLoaderModule
  ]
})
export class OrderstrackModule { }
