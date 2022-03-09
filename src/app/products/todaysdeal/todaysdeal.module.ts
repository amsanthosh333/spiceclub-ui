import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodaysdealRoutingModule } from './todaysdeal-routing.module';
import { TodaysdealComponent } from './todaysdeal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TodaysdealComponent
  ],
  imports: [
    CommonModule,
    TodaysdealRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,NgbModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,
    ToastrModule.forRoot()
  ]
})
export class TodaysdealModule { }
