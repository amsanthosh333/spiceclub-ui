import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent } from './wishlist.component';
import { FeatherModule } from 'angular-feather';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr'; 
import {
  Facebook,
  Twitter,
  Github,  Gitlab,  User,
  Key, UserCheck,  Mail,  Users,  Phone,  Globe,  Crosshair,  Flag,  Lock,  Award,  Briefcase,
  Smartphone,  UserPlus, PlusCircle,
  Airplay,
  Link2,MinusCircle,
  FileText
  
} from 'angular-feather/icons';
const icons = {
  Facebook,
  Twitter,
  Github,  Gitlab, User,  Key, UserCheck, Mail,  Users,  Phone,  Globe,
  Crosshair,  Flag,  Lock,  Award,  Briefcase,  Smartphone,  UserPlus,MinusCircle,
  Airplay,	Link2 
 ,FileText,PlusCircle
  
};
@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,FeatherModule,NgxSkeletonLoaderModule,NgbModule,FeatherModule.pick(icons),
    ToastrModule.forRoot()
  ]
})
export class WishlistModule { }
