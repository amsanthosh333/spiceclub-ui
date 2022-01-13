import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashRoutingModule } from './flash-routing.module';
import { FlashComponent } from './flash.component';


@NgModule({
  declarations: [
    FlashComponent
  ],
  imports: [
    CommonModule,
    FlashRoutingModule
  ]
})
export class FlashModule { }
