import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();
  private logoutsubject = new Subject<any>();
  private cartdata = new Subject<any>();
  private wishlistData = new Subject<any>();
  


  // header cart,wishlist,profile auto update

  sendClickEvent(){
    this.subject.next(value)
  }
  getClickEvent():Observable<any>{
  return this.subject.asObservable()
  
}

// wishlist
sendWishlistEvent(){
  this.wishlistData.next(value)
}
getWishlistEvent():Observable<any>{  
return this.wishlistData.asObservable()

}

  //  cart page update
senddeletecartEvent(){
  this.cartdata.next(value)
}
getcartClickEvent():Observable<any>{
return this.cartdata.asObservable()

}

  // wishlist page update
  senddeletewishlistEvent(){
    this.cartdata.next(value)
  }
  getwishlistClickEvent():Observable<any>{
  return this.cartdata.asObservable()
  
  }
sendlogout(){
 
  
  this.logoutsubject.next(value)
}
getlogout():Observable<any>{
 
  return this.logoutsubject.asObservable()
}
 
} 
function value(value: any, any: any) {
  throw new Error('Function not implemented.');
}

