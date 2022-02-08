import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BestsellingRoutingModule } from './bestselling-routing.module';
import { BestsellingComponent } from './bestselling.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    BestsellingComponent
  ],
  imports: [
    CommonModule,
    BestsellingRoutingModule,
    NgxPaginationModule,    NgxSkeletonLoaderModule,
     ToastrModule.forRoot(),NgbModule,ReactiveFormsModule
  ]
})
export class BestsellingModule { }
