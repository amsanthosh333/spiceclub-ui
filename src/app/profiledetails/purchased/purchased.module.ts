import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasedRoutingModule } from './purchased-routing.module';
import { PurchasedComponent } from './purchased.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr'; 

@NgModule({
  declarations: [
    PurchasedComponent
  ],
  imports: [
    CommonModule,
    PurchasedRoutingModule,ReactiveFormsModule,NgbModule,FormsModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,ToastrModule.forRoot()
  ]
})
export class PurchasedModule { }
