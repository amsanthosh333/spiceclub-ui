import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipedetailsRoutingModule } from './recipedetails-routing.module';
import { RecipedetailsComponent } from './recipedetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import {ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons'
import { ShareModule } from 'ngx-sharebuttons';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    RecipedetailsComponent
  ],
  imports: [
    CommonModule,
    RecipedetailsRoutingModule,ReactiveFormsModule,NgbModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,
    ToastrModule.forRoot(), FormsModule,
    ShareButtonsModule.withConfig({
      debug:true,
 }),ShareIconsModule,ShareModule
  ]
})
export class RecipedetailsModule { }
