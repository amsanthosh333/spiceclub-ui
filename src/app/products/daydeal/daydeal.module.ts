import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaydealRoutingModule } from './daydeal-routing.module';
import { DaydealComponent } from './daydeal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DaydealComponent
  ],
  imports: [
    CommonModule,
    DaydealRoutingModule, NgxPaginationModule,
    ReactiveFormsModule,NgbModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,
    ToastrModule.forRoot()
  ]
})
export class DaydealModule { }
