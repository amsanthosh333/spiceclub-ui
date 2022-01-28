import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {ToastrModule} from 'ngx-toastr'; 
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';
@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,FormsModule,ReactiveFormsModule,FormsModule,ReactiveFormsModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,ToastrModule.forRoot(),
    NgxBootstrapIconsModule,BootstrapIconsModule.pick(allIcons),NgbModule
  ]
})
export class ProfileModule { }
