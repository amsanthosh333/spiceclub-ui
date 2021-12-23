import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule, } from '@angular/forms';

import { AuthModule } from './auth/auth.module';
import { CategoryComponent } from './products/category/category.component';
import { BestsellersComponent } from './products/bestsellers/bestsellers.component';
import { FeaturedComponent } from './products/featured/featured.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoryComponent,
    BestsellersComponent,
    FeaturedComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AuthModule,
    ReactiveFormsModule,NgbModule,FormsModule,IvyCarouselModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
