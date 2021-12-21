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

@NgModule({
  declarations: [
    AppComponent,
    
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoryComponent,
    BestsellersComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AuthModule,
    ReactiveFormsModule,NgbModule,FormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
