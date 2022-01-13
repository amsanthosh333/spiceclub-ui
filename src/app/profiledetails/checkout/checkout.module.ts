import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import {ToastrModule} from 'ngx-toastr';
@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,FormsModule,ReactiveFormsModule
    ,NgSelectModule,NgxSkeletonLoaderModule,ToastrModule.forRoot()
  ]
})
export class CheckoutModule { }
