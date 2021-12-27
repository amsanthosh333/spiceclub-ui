import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopbyproductRoutingModule } from './shopbyproduct-routing.module';
import { ShopbyproductComponent } from './shopbyproduct.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
@NgModule({
  declarations: [
    ShopbyproductComponent
  ],
  imports: [
    CommonModule,
    ShopbyproductRoutingModule,ReactiveFormsModule,NgbModule,
    CarouselModule,IvyCarouselModule
  ]
})
export class ShopbyproductModule { }
