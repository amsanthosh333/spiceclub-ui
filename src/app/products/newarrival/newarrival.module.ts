import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewarrivalRoutingModule } from './newarrival-routing.module';
import { NewarrivalComponent } from './newarrival.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    NewarrivalComponent
  ],
  imports: [
    CommonModule,
    NewarrivalRoutingModule,  NgxPaginationModule,    NgxSkeletonLoaderModule,
    ToastrModule.forRoot(),NgbModule,ReactiveFormsModule,InfiniteScrollModule
  ]
})
export class NewarrivalModule { }