import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr'; 
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { allIcons } from 'ng-bootstrap-icons/icons';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,NgbModule,FormsModule,ReactiveFormsModule,
    CarouselModule,IvyCarouselModule,NgxSkeletonLoaderModule,ToastrModule.forRoot(),
    NgxBootstrapIconsModule,BootstrapIconsModule.pick(allIcons),NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WalletModule { }
