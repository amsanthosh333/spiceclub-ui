import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthdealRoutingModule } from './monthdeal-routing.module';
import { MonthdealComponent } from './monthdeal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
@NgModule({
  declarations: [
    MonthdealComponent
  ],
  imports: [
    CommonModule,
    MonthdealRoutingModule, NgxPaginationModule,
    ReactiveFormsModule,NgbModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,InfiniteScrollModule,
    ToastrModule.forRoot()
  ]
})
export class MonthdealModule { }
