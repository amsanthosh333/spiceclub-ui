import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KycRoutingModule } from './kyc-routing.module';
import { KycComponent } from './kyc.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    KycComponent
  ],
  imports: [
    CommonModule,
    KycRoutingModule,ReactiveFormsModule
  ]
})
export class KycModule { }
