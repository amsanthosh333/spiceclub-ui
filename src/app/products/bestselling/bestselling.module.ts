import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BestsellingRoutingModule } from './bestselling-routing.module';
import { BestsellingComponent } from './bestselling.component';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [
    BestsellingComponent
  ],
  imports: [
    CommonModule,
    BestsellingRoutingModule,
    NgxPaginationModule
  ]
})
export class BestsellingModule { }
