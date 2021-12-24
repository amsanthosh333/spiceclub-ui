import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopbyproductRoutingModule } from './shopbyproduct-routing.module';
import { ShopbyproductComponent } from './shopbyproduct.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    ShopbyproductComponent
  ],
  imports: [
    CommonModule,
    ShopbyproductRoutingModule,ReactiveFormsModule,NgbModule
  ]
})
export class ShopbyproductModule { }
