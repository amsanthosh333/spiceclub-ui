import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnRoutingModule } from './return-routing.module';
import { ReturnComponent } from './return.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    ReturnComponent
  ],
  imports: [
    CommonModule,
    ReturnRoutingModule,NgxSkeletonLoaderModule
  ]
})
export class ReturnModule { }
