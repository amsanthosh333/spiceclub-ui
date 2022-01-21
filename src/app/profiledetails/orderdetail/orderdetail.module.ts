import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderdetailRoutingModule } from './orderdetail-routing.module';
import { OrderdetailComponent } from './orderdetail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr'; 
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';

@NgModule({
  declarations: [
    OrderdetailComponent
  ],
  imports: [
    CommonModule,
    OrderdetailRoutingModule,NgbModule,FormsModule,ReactiveFormsModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,ToastrModule.forRoot(),
    NgxBootstrapIconsModule,BootstrapIconsModule.pick(allIcons)
  ]
})
export class OrderdetailModule { }
