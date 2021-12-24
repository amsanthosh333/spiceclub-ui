import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductdetailRoutingModule } from './productdetail-routing.module';
import { ProductdetailComponent } from './productdetail.component';


@NgModule({
  declarations: [
    ProductdetailComponent
  ],
  imports: [
    CommonModule,
    ProductdetailRoutingModule
  ]
})
export class ProductdetailModule { }
