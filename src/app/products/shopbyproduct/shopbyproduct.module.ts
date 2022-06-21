import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopbyproductRoutingModule } from './shopbyproduct-routing.module';
import { ShopbyproductComponent } from './shopbyproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import { Ng5SliderModule } from 'ng5-slider';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    ShopbyproductComponent
  ],
  imports: [
    CommonModule,
    ShopbyproductRoutingModule,ReactiveFormsModule,NgbModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,
    ToastrModule.forRoot(),Ng5SliderModule,FormsModule ,InfiniteScrollModule
    
  ]
  
})
export class ShopbyproductModule { }
