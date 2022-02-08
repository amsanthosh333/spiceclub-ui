import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductdetailRoutingModule } from './productdetail-routing.module';
import { ProductdetailComponent } from './productdetail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { NgImageSliderModule } from 'ng-image-slider';
import {ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons'
import { ShareModule } from 'ngx-sharebuttons';

@NgModule({
  declarations: [
    ProductdetailComponent
  ],
  imports: [
    CommonModule,
    ProductdetailRoutingModule,ReactiveFormsModule,NgbModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,NgImageFullscreenViewModule,
    ToastrModule.forRoot(),NgImageSliderModule,
    ShareButtonsModule.withConfig({
         debug:true,
    }),ShareIconsModule,ShareModule

    
  ]
})
export class ProductdetailModule { }
