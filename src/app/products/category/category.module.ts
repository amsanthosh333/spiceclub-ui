import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { NgImageSliderModule } from 'ng-image-slider';
@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,ReactiveFormsModule,NgbModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,
    ToastrModule.forRoot(),CollapseModule,NgxNavbarModule,NgImageSliderModule
  ]
})
export class CategoryModule { }
