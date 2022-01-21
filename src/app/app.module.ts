import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule, } from '@angular/forms';

import { AuthModule } from './auth/auth.module';

import { BestsellersComponent } from './products/bestsellers/bestsellers.component';
import { FeaturedComponent } from './products/featured/featured.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {BestsellingModule} from './products/bestselling/bestselling.module';
import { ShopbyproductModule } from './products/shopbyproduct/shopbyproduct.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    FooterComponent,
    HomeComponent, 
    BestsellersComponent,
    FeaturedComponent,
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    AppRoutingModule,AuthModule,
    ReactiveFormsModule,NgbModule,
    FormsModule,IvyCarouselModule,
    CarouselModule,
    BestsellingModule,ShopbyproductModule,
    NgxSkeletonLoaderModule,ToastrModule.forRoot({
      // timeOut: 1000,
      // positionClass: 'toast-bottom-right'
    }),RouterModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
