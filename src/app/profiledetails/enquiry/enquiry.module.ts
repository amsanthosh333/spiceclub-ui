import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquiryRoutingModule } from './enquiry-routing.module';
import { EnquiryComponent } from './enquiry.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EnquiryComponent
  ],
  imports: [
    CommonModule,
    EnquiryRoutingModule,ReactiveFormsModule
  ]
})
export class EnquiryModule { }
