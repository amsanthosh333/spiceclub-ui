import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribedprodRoutingModule } from './subscribedprod-routing.module';
import { SubscribedprodComponent } from './subscribedprod.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
@NgModule({
  declarations: [
    SubscribedprodComponent
  ],
  imports: [
    CommonModule,
    SubscribedprodRoutingModule, NgxPaginationModule, NgxSkeletonLoaderModule,
    ToastrModule.forRoot(),NgbModule,ReactiveFormsModule,InfiniteScrollModule
  ]
})
export class SubscribedprodModule { }
