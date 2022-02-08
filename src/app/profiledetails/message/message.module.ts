import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {ToastrModule} from 'ngx-toastr'; 
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,FormsModule,ReactiveFormsModule,FormsModule,ReactiveFormsModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,ToastrModule.forRoot(),
    NgxBootstrapIconsModule,BootstrapIconsModule.pick(allIcons),NgbModule,NgSelectModule
  ]
})
export class MessageModule { }
