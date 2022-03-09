import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorelocationRoutingModule } from './storelocation-routing.module';
import { StorelocationComponent } from './storelocation.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    StorelocationComponent
  ],
  imports: [
    CommonModule,
    StorelocationRoutingModule,NgxSkeletonLoaderModule
  ]
})
export class StorelocationModule { }
