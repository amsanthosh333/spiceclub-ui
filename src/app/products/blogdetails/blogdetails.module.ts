import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogdetailsRoutingModule } from './blogdetails-routing.module';
import { BlogdetailsComponent } from './blogdetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import {ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons'
import { ShareModule } from 'ngx-sharebuttons';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    BlogdetailsComponent
  ],
  imports: [
    CommonModule,
    BlogdetailsRoutingModule,ReactiveFormsModule,NgbModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,
    ToastrModule.forRoot(), FormsModule,
    ShareButtonsModule.withConfig({
      debug:true,
 }),ShareIconsModule,ShareModule
  ]
  
})
export class BlogdetailsModule { }
