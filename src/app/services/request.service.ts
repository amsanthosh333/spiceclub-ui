import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, ObservableInput, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { catchError} from 'rxjs/operators';
import {  throwError } from 'rxjs';
import {  retry } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string | undefined;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  // private endPoint1 = "https://admin.jcombiz.com/jcomweb/login.php"
  private endPoint1 = "https://neophroncrm.com/spiceclubnew/api/v2"
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  extractData:any;
  handleError!: (err: any, caught: Observable<Object>) => ObservableInput<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')

    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    // this.userid = this.currentdetail?.user.id;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    console.log("currentuser=", this.currentUser);
    console.log("currentusezr=", this.currentdetail.access_token);
  }

  logout() { 
    this.url = `${this.endPoint1}/auth/logout`;
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
    return this.http.get(this.url,{headers:headers})
  }
  getbyertype(){
    this.url= `${this.endPoint1}/buyertypes`;
    return this.http.get(this.url);
  }

  // brands
  public getallbrands() {
    this.url = `${this.endPoint1}/brands`;
    return this.http.get(this.url);
  }
  public gettopbrands() {
    this.url = `${this.endPoint1}/brands/top`;
    return this.http.get(this.url);
  }

  public viewallbrands(link: string) {
    return this.http.get(link);

  }
  public viewbrandsproducd(link: string) {
    return this.http.get(link);
  }

  public topsellproduct(id: string) {
    this.url = `${this.endPoint1}/products/top-from-seller/` + id;
    return this.http.get(this.url);
  }
  public getslider() {
    this.url = `${this.endPoint1}/sliders`;
    return this.http.get(this.url);
  }
  public getfuturedcat() {
    this.url = `${this.endPoint1}/categories/featured`;
    return this.http.get(this.url);
  }
  


  public viewallfeatured(link: string) {
    return this.http.get(link);

  }

  public viewfeatproducd(link: string) {
    return this.http.get(link);
  }
  public getbanner() {
    this.url = `${this.endPoint1}/banners`;
    return this.http.get(this.url);
  }

  public addtocart(body: any) {
  const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer'+' '+ this.accesstoken)
      // .set('Access-Control-Allow-Origin', '*')
      this.url = `${this.endPoint1}/carts/add`;
      console.log("sts",this.url)
      return this.http.post(this.url,body,{headers:headers});
   
  }
  
  public cartcount(id:any,) {  
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/cart-count/` + id;
    console.log("sts",headers)
    return this.http.get(this.url,{headers:headers});      
  }
  public fetchusercart(id:any,) {  
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/carts/` + id;
    console.log("sts",headers)
    return this.http.post(this.url,null,{headers:headers});      
  }
  public fetchcartprocess(body:any) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/carts/process`;
    return this.http.post(this.url, body, {headers:headers});
    
  }
  deleteproud(id:any) {  
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/carts/remove/` + id;
    return this.http.get(this.url,{headers:headers});
}

updatecart(body:any) {  
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/carts/change-quantity`;
  return this.http.post(this.url,body,{headers:headers});
}
fetchsummery(id:any) {  
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/cart-summary/` + id;
  return this.http.get(this.url,{headers:headers});
}

public checkwishlist(prodid:any,userid:any){
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('X-Requested-With', 'XMLHttpRequest') 
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  
  this.url = `${this.endPoint1}/wishlists-check-product?product_id=`+prodid+`&user_id=`+ userid;
console.log("urllll",this.url)
  return this.http.get(this.url, {headers:headers});

}
public addtowishlist(body: any) {
  const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Authorization', 'Bearer'+' '+ this.accesstoken)
      
      this.url = `${this.endPoint1}/wishlists`;
    // console.log("sts",newconnect)
      return this.http.post(this.url, body, {headers:headers});
   
  }
  // deals
  public gettodaysdeal() {
    this.url = `${this.endPoint1}/products/todays-deal`;
    return this.http.get(this.url);
  }
  public getdaydealpro() {
    this.url = `${this.endPoint1}/products/deal-of-day`;
    return this.http.get(this.url);
  }
  public getmonthdealpro() {
    this.url = `${this.endPoint1}/products/deal-of-month`;
    return this.http.get(this.url);
  }

  public fetchuserwishlist(id:any,) {  
    const headers = new HttpHeaders() 
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/wishlists/` + id;
    console.log("sts",this.url)
    return this.http.get(this.url,{headers:headers});      
  }
  deletewishproud(id:any) {  
    const headers = new HttpHeaders()
    
    .set('Authorization', 'Bearer'+' '+ this.accesstoken)
    this.url = `${this.endPoint1}/wishlists/` + id;
    return this.http.delete(this.url,{headers:headers});
}
//maximum prize
public getmaximumprice(){
  this.url = `${this.endPoint1}/products/maxprice`;
  return this.http.get(this.url);
}
//profileee
public fetchuserprofile(id:any){
  
  this.url = `${this.endPoint1}/profile/getprofile/` + id;
  console.log("stssss",this.url)
  return this.http.get(this.url);  
}
// address
public addaddress(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)    
   this.url = `${this.endPoint1}/user/shipping/create`;
   return this.http.post(this.url,body,{headers:headers});
}
public fetchcountry() {
  this.url = `${this.endPoint1}/countries`;
  return this.http.get(this.url);
}
public fetchstate() {
  this.url = `${this.endPoint1}/states`;
  return this.http.get(this.url);
}
public fetchstatebycountry(id:any) {
  this.url = `${this.endPoint1}/states-by-country/` + id;
  return this.http.get(this.url);
}
public fetchCity() {
  this.url = `${this.endPoint1}/cities`;
  return this.http.get(this.url);
}
public fetchcitybystate(id:any) {
  this.url = `${this.endPoint1}/cities-by-state/`+ id;
  return this.http.get(this.url);
}
public fetchaddress(id:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  console.log("headers",headers)
  this.url = `${this.endPoint1}/user/shipping/address/` + id;
  return this.http.get(this.url,{headers:headers});
}
public updateaddress(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/user/shipping/update`;
  return this.http.post(this.url,body,{headers:headers});
}

public updateshippingaddress(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/update-address-in-cart`;
  return this.http.post(this.url,body,{headers:headers});
}
deleteaddress(id:any) {  
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/user/shipping/delete/` + id;
  return this.http.get(this.url,{headers:headers});
}
public fetchcost(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/shipping_cost`;
  return this.http.post(this.url,body,{headers:headers});
}
// futuredproduct
public getfuturedpro() {
  this.url = `${this.endPoint1}/products/featured`;
  return this.http.get(this.url);
}
// bestseling pro
public getbestsellpro() {
  this.url = `${this.endPoint1}/products/best-seller`;
  return this.http.get(this.url);
}
// orders
public fetchOrders(id:any) {
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)    
   this.url = `${this.endPoint1}/purchase-history/`  + id;
   return this.http.get(this.url,{headers:headers});
}
public vieworderdetail(id:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/purchase-history-details/` + id;
  return this.http.get(this.url,{headers:headers});
}
public vieworderitems(id:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/purchase-history-items/` + id;
  return this.http.get(this.url,{headers:headers});
}
// paymenttype
public fetchpaytype() {
  this.url = `${this.endPoint1}/payment-types`;
  return this.http.get(this.url);
}
// placeorder
public placeorder(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/order/store`;
  return this.http.post(this.url,body,{headers:headers});
}




// razorpay
public razorpay1(body:any) {
  this.url = `${this.endPoint1}/razorpay/pay-with-razorpay`;
  return this.http.post(this.url,body);
}


public razorpay3() {
  this.url = `${this.endPoint1}/razorpay/pay-with-razorpay?payment_type=cart_payment&combined_order_id=111&amount=82&user_id=8`;
  console.log("urlll",this.url);
  window.open(this.url);
  return this.http.get<any>(`https://neophroncrm.com/spiceclubnew/api/v2/razorpay/payment`)
}


// razorpay test
public razorpay2(body:any): Observable<any> {
  this.url = `${this.endPoint1}/razorpay/pay-with-razorpay`;
 
  console.log("usrlll",this.url);
  
  return this.http.post(this.url,body) .pipe(map((response: any) => response.json())
    // .catchError(this.handleErrorr)
  );;
}

private handleErrorr(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.log(error.error.message)

  } else {
    console.log(error.status)
  }
  return throwError(
    console.log('Something is wrong!'));
};

// paymentstatus api 
 razorpayment(id:any) {
  this.url = `${this.endPoint1}/razorpay/payment?razorpay_payment_id=`+ id;
  console.log("url",this.url);
  return this.http.get(this.url);
}
razsuccess(body:any) {
  this.url = `${this.endPoint1}/razorpay/success`;
  console.log("url",this.url);
  return this.http.post(this.url,body);
}

//category
public getallcat() {
  this.url = `${this.endPoint1}/categories`;
  return this.http.get(this.url);
}
public gethomecat() {
  this.url = `${this.endPoint1}/home-categories`;
  return this.http.get(this.url);
}
public gettopcat() {
  this.url = `${this.endPoint1}/categories/top`;
  return this.http.get(this.url);
}
public getcatprod(id:any,page:any) {
  this.url = `${this.endPoint1}/products/category/` + id +'?page='+ page +'&name=';
  return this.http.get(this.url);
}
public getcatsearchprod(id:any,page:any,key:any) {
  this.url = `${this.endPoint1}/products/category/` + id +'?page='+ page +'&name='+ key;
  return this.http.get(this.url);
}
public getsubcategoryofcat(id:any){
  this.url = `${this.endPoint1}/sub-categories/` +id ;
  return this.http.get(this.url);

}
public getsubcatprod(id:any,page:any) {
  this.url = `${this.endPoint1}/products/sub-category/` + id +'?page='+ page ;
  return this.http.get(this.url);
}
public getsubcatsearchprod(id:any,page:any,key:any) {
  this.url = `${this.endPoint1}/products/sub-category/` + id +'?page='+ page+'&name='+ key ;
  return this.http.get(this.url);
}
public getcatsubprod(link: string) {
  return this.http.get(link);
}
// shopbyproducts
public getallproducts(page:any) { 
  this.url = `${this.endPoint1}/products?page=` + page;
  return this.http.get(this.url,);
}
public getpage(link:any){
  return this.http.get(link);
}
// productbybrand

public getbrandprod(id:string,page:any,) {
  this.url = `${this.endPoint1}/products/brand/` + id +'?page='+ page;
  console.log("url",this.url)
  return this.http.get(this.url);
}
public getbrandsearchprod(id:string,page:any,key:any) {
  this.url = `${this.endPoint1}/products/brand/` + id +'?page='+ page +'&name='+ key;
  console.log("url",this.url)
  return this.http.get(this.url);
}

//prod detail
public getproddetail(id: string) {
  this.url = `${this.endPoint1}/products/` + id ;
  return this.http.get(this.url);
}
public getcatprodbyid(id: string) {
  this.url = `${this.endPoint1}/products/category/` + id +`?page=1&name=`;
  return this.http.get(this.url);
}

public getbulckdisc(b_id: string,P_id:any) {
  this.url = `${this.endPoint1}/buyertypepricing/bulkproduct?buyertype=` + b_id +`&product_id=`+ P_id;
  return this.http.get(this.url);
}
public getdisc(b_id: string,P_id:any) {
  this.url = `${this.endPoint1}/buyertypepricing?buyertype=` + b_id +`&product_id=`+ P_id;
  return this.http.get(this.url);
}
public getdiscountprice(b_id: any, P_id:any, var_value:any, qty:any) {
  console.log("varr",var_value);
  
  this.url = `${this.endPoint1}/products/discountprice?id=`+ P_id + `&variant=`+ var_value +`&quantity=`+ qty +`&buyertype=` + b_id ;
  console.log("url",this.url);
 
  return this.http.get(this.url);
}
//related product
public getrelatedprod(id: string) {
  this.url = `${this.endPoint1}/products/related/` + id ;
  return this.http.get(this.url);
}
public addvarient(id: string,varient:any) {
  this.url = `${this.endPoint1}/products/variant/price?id=` + id +`&color=` +`&variants=` + varient;
  return this.http.get(this.url);
}
public getsortprod(sort: string) {
  this.url = `${this.endPoint1}/products/search?sort_key=` + sort ;
  console.log(this.url);
  
  return this.http.get(this.url);
}
public filterdataa(category:any,brand:any,min:any,max:any) {
  this.url = `${this.endPoint1}/products/search?categories=` + category +`&brands=` + brand +`&name=` +`&min=` + min +`&max=` +max ;
  return this.http.get(this.url);
}
public filterdataa2(min:any,max:any) {
  this.url = `${this.endPoint1}/products/search?categories=&brands=&name=&min=` + min +`&max=` +max ;
  return this.http.get(this.url);
}
public filtersearchdataa(name:any) {
  this.url = `${this.endPoint1}/products/search?name=`  +name ;
  return this.http.get(this.url);
}
//flashdeal
 public getprodbyflash(id: any,page:any) {
  this.url = `${this.endPoint1}/flash-deal-products/`+id +'?page='+ page;
  return this.http.get(this.url);
}
public getallflashdeal() {
  this.url = `${this.endPoint1}/flash-deals`;
  return this.http.get(this.url);
}
public gettodaysoffer() {
  this.url = `${this.endPoint1}/todayoffer`;
  return this.http.get(this.url);
}
//review
public addreview(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/reviews/submit`;
  return this.http.post(this.url,body,{headers:headers});
}
public getproductcomments(id: string) {
  this.url = `${this.endPoint1}/reviews/product/` + id ;
  return this.http.get(this.url);
}
//shops
public getallshop( ) {
  this.url = `${this.endPoint1}/shops`;
  return this.http.get(this.url); 
}

public getshopdetails(id: string) {
  this.url = `${this.endPoint1}/shops/details/` + id ;
  return this.http.get(this.url);
}
public getnewarrival(id: string) {
  this.url = `${this.endPoint1}/shops/products/new/` + id ;
  return this.http.get(this.url);
}
public getshopfeatured(id: string) {
  this.url = `${this.endPoint1}/shops/products/featured/` + id ;
  return this.http.get(this.url);
}
public gettopshop(id: string) {
  this.url = `${this.endPoint1}/shops/products/top/` + id ;
  return this.http.get(this.url);
}

public fetchwallet(id: string) {
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/wallet/balance/` + id ;
  return this.http.get(this.url,{headers:headers});
}
public fetchrechisttory(id: string) {
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/wallet/history/` + id ;
  return this.http.get(this.url,{headers:headers});
}
//recipe
public getallrecipecat() {
  this.url = `${this.endPoint1}/recipe/categories`;
  return this.http.get(this.url);
}
public getrecipebycat(id: string ,page:any) {
  this.url = `${this.endPoint1}/recipe/category/` + id+`?page=`+page ;
  return this.http.get(this.url);
}
public getrecipedetail(id: string) {
  this.url = `${this.endPoint1}/recipe/` + id ;
  return this.http.get(this.url);
}
public getcomments(id: string) {
  this.url = `${this.endPoint1}/recipecomment/recipe/` + id ;
  return this.http.get(this.url);
}
public addrecipecomment(body:any) {
  this.url = `${this.endPoint1}/recipecomment/submit`;
  return this.http.post(this.url,body);
}
public getallrecipe(page:any) {
  this.url = `${this.endPoint1}/recipe`+`?page=`+page ;
  return this.http.get(this.url);
}

//blog
public getallblog(page:any) {
  this.url = `${this.endPoint1}/blog`+`?page=`+page;
  return this.http.get(this.url);
}
public getallblogcat() {
  this.url = `${this.endPoint1}/blog/categories`;
  return this.http.get(this.url);
}
public getblogbycat(id: string,page:any) {
  this.url = `${this.endPoint1}/blog/category/` + id+`?page=` +page ;
  return this.http.get(this.url);
}
public getblogdetail(id: string) {
  this.url = `${this.endPoint1}/blog/` + id ;
  return this.http.get(this.url);
}
public getblogcomments(id: string) {
  this.url = `${this.endPoint1}/blogcomment/blog/` + id ;
  return this.http.get(this.url);
}
public addblogcomment(body:any) {
  this.url = `${this.endPoint1}/blogcomment/submit`;
  console.log(this.url);
  return this.http.post(this.url,body);
}
public searchblog(key:any) {
  this.url = `${this.endPoint1}/blogcomment/submit`;     ////////////////////////add search//////////////////////////////////////
  return this.http.get(this.url);
}
public searchbyblog(key:any) {
  this.url = `${this.endPoint1}/blogcomment/submit`;     ////////////////////////add search//////////////////////////////////////
  return this.http.get(this.url);
}

//feedbacks
public getfeedbacks() {
  this.url = `${this.endPoint1}/feedback`;
  return this.http.get(this.url);
}
public addfeedback(body:any) {
  this.url = `${this.endPoint1}/feedback/submit`;
  return this.http.post(this.url,body);
}
//coupan
public appycoupan(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/coupon-apply`;
  return this.http.post(this.url,body,{headers:headers});
}
public removecoupan(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/coupon-remove`;
  return this.http.post(this.url,body,{headers:headers});
}

//profile
public getcountes(id: string) {
  const headers = new HttpHeaders()
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/profile/counters/` + id ;
  console.log("url",this.url)
  return this.http.get(this.url,{headers:headers});

}
public updateProfile(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/profile/update`;
  return this.http.post(this.url,body,{headers:headers});
} 
public changeimg(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken) 
  this.url = `${this.endPoint1}/profile/update-image`;
  return this.http.post(this.url,body,{headers:headers});
} 
// conversation
public addconv(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/chat/create-conversation`;
  return this.http.post(this.url,body,{headers:headers});
}
public getallconv(id: string) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/chat/conversations/` + id ;
  return this.http.get(this.url,{headers:headers});
}
public getallmessages(id: string) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/chat/messages/` + id ;
  return this.http.get(this.url,{headers:headers});
}
public sendmessages(body:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/chat/insert-message`;
  return this.http.post(this.url,body,{headers:headers});
}
public getnewmessages(convid: any,lastid:any) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/chat/get-new-messages/` + convid +`/` + lastid +`?Content-Type=` + "application/json" +`&Authorization=Bearer`+ this.accesstoken;
  console.log("url",this.url)
  return this.http.get(this.url,{headers:headers});
}
public quickorder(id: any,) {
  const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', 'Bearer'+' '+ this.accesstoken)
  this.url = `${this.endPoint1}/quickorder/` + id ;
  console.log("url",this.url)
  return this.http.get(this.url,{headers:headers});
}


// billdesk
// https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=74&amount=188.00&user_id=8

public billdeskpay(combined_order_id:any,amount:any,user_id:any) {
   this.url = `${this.endPoint1}/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=` + combined_order_id +`&amount=` +amount+ `&user_id=`+ user_id;
 console.log("urlll=",this.url);
 window.open(this.url);
 return  this.http.get(this.url)
 .pipe(map((response: any) => response.json()));  
 
 //  {responseType: 'text' as 'json'}

//  .pipe(  
//   map((res) => {
//     var stringified = JSON.stringify(res);
//     var parsedObj = JSON.parse(stringified);
   
//     console.log("cer:",parsedObj);
//     return res;
//   })
//  )
  
}
public billdeskpayment(): Observable<string>  {
  this.url =`https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=74&amount=188.00&user_id=8`
console.log("urlll=",this.url);
// window.open(this.url);
 return this.http.get<any>(this.url)
//  .pipe( map((res) => {
//        var stringified = JSON.stringify(res);
//       // var parsedObj = JSON.parse(res);
     
//       console.log("cer:",stringified);
//       return res;
//     })
//    )
}


// public billdeskpayment(): Observable<Car[]> {
//   this.url =`https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=74&amount=188.00&user_id=8`
// console.log("urlll=",this.url);
//   return this.http.get(this.url).pipe(
//     map((res: Response) => {
//       let body = res.json();
//       return body || { };
//     })
    
// }

 


}
