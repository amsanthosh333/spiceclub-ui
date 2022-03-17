import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {  Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (!this.authService.isLoggedIn()) {
       
        this.router.navigate(['/login']); 
        return false;
      }
      return true;
    
      // if (this.authService.currentUserValue) {
      //   console.log(this.authService.currentUserValue);
        
      //   console.log("authguard ");
      //   this.router.navigate(['/login']);
      //   return false;   
      // } 
    // return true;;
  }
  
}
