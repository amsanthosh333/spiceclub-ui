import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetComponent } from './forget/forget.component';
@NgModule({
  declarations: [LoginComponent, SignupComponent, ForgetComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,HttpClientModule,ReactiveFormsModule
  ]
})
export class AuthModule { }
