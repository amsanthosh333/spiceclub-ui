import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacypolicyRoutingModule } from './privacypolicy-routing.module';
import { PrivacypolicyComponent } from './privacypolicy.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    PrivacypolicyComponent
  ],
  imports: [
    CommonModule,
    PrivacypolicyRoutingModule,NgxSkeletonLoaderModule
  ]
})
export class PrivacypolicyModule { }
