import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, ObservableInput, of, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { temporaryId, User } from '../models/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  endPoint1 = environment.baseURL1;
  url: string | undefined;
  currentUserSubject: BehaviorSubject<User>;
  // temporaryIdSubject!: BehaviorSubject<temporaryId>;
  // temp_Id!: Observable<User>;
  currentUser: Observable<User>;

  // private endPoint1 = "https://neophroncrm.com/spiceclubnew/api/v2"
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  extractData: any;
  handleError!: (err: any, caught: Observable<Object>) => ObservableInput<any>;
  buyertypeid: any;

  temporaryIdSubject: BehaviorSubject<temporaryId>;
  temp_Id: Observable<temporaryId>;
  temp_detail: temporaryId;
  currrent_temp_Id: any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')

    );
    // console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail?.user?.id;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    this.buyertypeid = this.currentdetail.user?.buyertypeid;
    if (this.userid == undefined) {

      this.userid = 0
      this.buyertypeid = 0
    }
    if (this.buyertypeid == undefined) {
      this.buyertypeid = 1
    }
    //  localStorage.removeItem('temporaryId');
    this.temporaryIdSubject = new BehaviorSubject<temporaryId>(
      JSON.parse(localStorage.getItem('temporaryId') || '{}')
    );
    this.temp_Id = this.temporaryIdSubject.asObservable();
    this.temp_detail=this.temporaryIdSubject.value;
    this.currrent_temp_Id=this.temp_detail.temp_user_id

    if(this.currrent_temp_Id == undefined ){
      console.log("this.temp_Id_serser if",this.currrent_temp_Id);   
      this.currrent_temp_Id = ""
    }
   
    console.log(" this.currrent_temp_Id", this.currrent_temp_Id);   
  }

  ngOnInit(): void {
    console.log("service file oninit");
    
  }
  logout() {
    this.url = `${this.endPoint1}/auth/logout`;
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    localStorage.removeItem('currentUser');
   
    

    this.currentUserSubject.next(null!);
    return this.http.get(this.url, { headers: headers })
  }
  getbyertype() {
    this.url = `${this.endPoint1}/buyertypes`;
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
    this.url = `${this.endPoint1}/products/top-from-seller/` + id + `&buyertype=` + this.buyertypeid;
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
  //testimonial
  public gettestimonial() {
    this.url = `${this.endPoint1}/testimonial`;
    return this.http.get(this.url);
  }
  public addtocart(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    // .set('Access-Control-Allow-Origin', '*')
    this.url = `${this.endPoint1}/carts/add`;
    // this.url = `${this.endPoint1}/testcarts/add`;
      body.temp_user_id=this.currrent_temp_Id
     console.log("Add to cart body:",body);
    return this.http.post(this.url, body, { headers: headers })
    .pipe(    
      map((temporaryId) => { 
        localStorage.setItem('temporaryId', JSON.stringify(temporaryId));

        this.temporaryIdSubject = new BehaviorSubject<temporaryId>(
          JSON.parse(localStorage.getItem('temporaryId') || '{}')
        );
        this.temp_Id = this.temporaryIdSubject.asObservable();
        this.temp_detail=this.temporaryIdSubject.value;
        this.currrent_temp_Id=this.temp_detail.temp_user_id  
        // this.temporaryIdSubject.next(temporaryId); 
        // // console.log("currentuser:",user);
        return temporaryId;
      })
    );

  }

  public cartcount(id: any,) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
     this.url = `${this.endPoint1}/cart-count/` + id +`?temp_user_id=`+ this.currrent_temp_Id;
    // this.url = `${this.endPoint1}/testcart-count/` + id +`?temp_user_id=`+ this.currrent_temp_Id;
    console.log("cartcount",this.url);
    
    return this.http.get(this.url, { headers: headers });
  }

  public availablecoupan() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/coupon/availablecoupon`;
    return this.http.get(this.url, { headers: headers });
  }
  public fetchusercart(id: any, buynowid: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
     this.url = `${this.endPoint1}/carts/` + id + `?is_buynow=` + buynowid+ `&buyertype=` + this.buyertypeid+`&temp_user_id=`+ this.currrent_temp_Id;;
    //this.url = `${this.endPoint1}/testcarts/` + id + `?is_buynow=` + buynowid+ `&buyertype=` + this.buyertypeid+`&temp_user_id=`+ this.currrent_temp_Id;
    console.log("testcars url",this.url);
    
    return this.http.post(this.url, null, { headers: headers });
  }
  public fetchcartprocess(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
     this.url = `${this.endPoint1}/carts/process`;
   // this.url = `${this.endPoint1}/testcarts/process`;
    return this.http.post(this.url, body, { headers: headers });

  }
  deleteproud(id: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
   this.url = `${this.endPoint1}/carts/remove/` + id;
   // this.url = `${this.endPoint1}/testcarts/remove/` + id;
    return this.http.get(this.url, { headers: headers });
  }

  updatecart(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
     this.url = `${this.endPoint1}/carts/change-quantity`;
  //  this.url = `${this.endPoint1}/testcarts/change-quantity`;
    return this.http.post(this.url, body, { headers: headers });
  }
  fetchsummery(id: any, buynowid: any, paymenttype:any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
     this.url = `${this.endPoint1}/cart-summary/`+ id +`?buyertype=` + this.buyertypeid+ `&is_buynow=` + buynowid + `&payment_type=` + paymenttype+`&temp_user_id=`+ this.currrent_temp_Id;
   // this.url = `${this.endPoint1}/testcart-summary/`+ id +`?buyertype=` + this.buyertypeid+ `&is_buynow=` + buynowid + `&payment_type=` + paymenttype+`&temp_user_id=`+ this.currrent_temp_Id;
   console.log(this.url);
   
    return this.http.get(this.url, { headers: headers });
  }

  public checkwishlist(prodid: any, userid: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)

    this.url = `${this.endPoint1}/wishlists-check-product?product_id=` + prodid + `&user_id=` + userid;
    return this.http.get(this.url, { headers: headers });

  }
  public checksubscribe(prodid: any, userid: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)

    this.url = `${this.endPoint1}/subscribes-check-product?product_id=` + prodid + `&user_id=` + userid;
    return this.http.get(this.url, { headers: headers });

  }
  public addtowishlist(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)

    this.url = `${this.endPoint1}/wishlists`;
    
    body.buyertypeid =this.buyertypeid
    console.log("wishlists body",body);
    return this.http.post(this.url, body, { headers: headers });

  }
  // Subscribe product
  public addtosubscribe(userid: any, prdid: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)

    this.url = `${this.endPoint1}/subscribes-add-product?product_id=` + prdid + `&user_id=` + userid;
    return this.http.get(this.url, { headers: headers });

  }
  public removefromsubscribe(userid: any, prdid: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-Requested-With', 'XMLHttpRequest')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/subscribes-remove-product?product_id=` + prdid + `&user_id=` + userid;
    console.log("this.url", this.url);
    return this.http.get(this.url, { headers: headers });
  }
  // deals
  public gettodaysdeal(categoryid: any) {
    this.url = `${this.endPoint1}/products/todays-deal?category=` + categoryid + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  public getdaydealpro(categoryid: any) {
    this.url = `${this.endPoint1}/products/deal-of-day?category=` + categoryid + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  public getmonthdealpro(categoryid: any) {
    this.url = `${this.endPoint1}/products/deal-of-month?category=` + categoryid + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  public getflashdealpro(categoryid: any) {
    this.url = `${this.endPoint1} /flash-deal-productslist`;
    // this.url = `${this.endPoint1}/flash-deal-products/1?category=` + categoryid + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  public getflashdeals() {
    this.url = `${this.endPoint1}/flash-deals`;
    return this.http.get(this.url);
  }
  public fetchuserwishlist(id: any,) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/wishlists/` + id;
    return this.http.get(this.url, { headers: headers });
  }
  deletewishproud(id: any) {
    const headers = new HttpHeaders()

      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/wishlists/` + id;
    return this.http.delete(this.url, { headers: headers });
  }
  deletewishproud2(id: any) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/wishlists-remove-product?product_id=` + id + `&user_id=` + this.userid;

    return this.http.get(this.url, { headers: headers });
  }
  //maximum prize
  public getmaximumprice() {
    this.url = `${this.endPoint1}/products/maxprice`;
    return this.http.get(this.url);
  }
  //profileee
  public fetchuserprofile(id: any) {

    this.url = `${this.endPoint1}/profile/getprofile/` + id;
    // console.log(this.url);

    return this.http.get(this.url);
  }
  // kyc
  public addkyc(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/kyc/submit`;
    return this.http.post(this.url, body, { headers: headers });
  }
  //B2b enquiry 

  public sendenquiry(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/b2benquery/submit`;
    console.log(this.url);
    return this.http.post(this.url, body, { headers: headers });
  }
  // address
  public addaddress(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/user/shipping/create`;
    return this.http.post(this.url, body, { headers: headers });
  }
  public fetchcountry() {
    this.url = `${this.endPoint1}/countries`;
    return this.http.get(this.url);
  }
  public fetchstate() {
    this.url = `${this.endPoint1}/states`;
    return this.http.get(this.url);
  }
  public fetchstatebycountry(id: any) {
    this.url = `${this.endPoint1}/states-by-country/` + id;
    return this.http.get(this.url);
  }
  public fetchCity() {
    this.url = `${this.endPoint1}/cities`;
    return this.http.get(this.url);
  }
  public fetchcitybystate(id: any) {
    this.url = `${this.endPoint1}/cities-by-state/` + id;
    return this.http.get(this.url);
  }
  public fetchaddress(id: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/user/shipping/address/` + id;
    return this.http.get(this.url, { headers: headers });
  }
  public updateaddress(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/user/shipping/update`;
    return this.http.post(this.url, body, { headers: headers });
  }

  public updateshippingaddress(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/update-address-in-cart`;
    return this.http.post(this.url, body, { headers: headers });
  }
  deleteaddress(id: any) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/user/shipping/delete/` + id;
    return this.http.get(this.url, { headers: headers });
  }
  public fetchcost(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/shipping_cost`;
    return this.http.post(this.url, body, { headers: headers });
  }

  public makeshipingaddress(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/user/shipping/make_default`;
    return this.http.post(this.url, body, { headers: headers });

  }
  // futuredproduct
  public getfuturedpro() {
    this.url = `${this.endPoint1}/products/featured?user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  // bestseling pro
  public getbestsellpro() {
    this.url = `${this.endPoint1}/products/best-seller?user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  //newarrival
  public getnewarrivalpro() {
    this.url = `${this.endPoint1}/products/newarrivals?user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  //subscribed products
  public getsubscribedpro() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/subscribes/` + this.userid;
    console.log(this.url);
    return this.http.get(this.url, { headers: headers });
  }
  // orders
  public fetchOrders(id: any, page: any) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/purchase-history/` + id + `?page=` + page;
    return this.http.get(this.url, { headers: headers });
  }
  public fetchOrders4(id: any, page: any, delivery: any, payment: any) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/purchase-history/` + id + `?page=` + page + `&delivery_status=` + delivery + `&payment_status=` + payment;
    console.log(this.url);
    return this.http.get(this.url, { headers: headers });
  }

  public fetchOrders1(id: any, delivery: any) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/purchase-history/` + id + `?delivery_status=` + delivery;
    console.log(this.url);

    return this.http.get(this.url, { headers: headers });
  }
  public fetchOrders2(id: any, delivery: any, payment: any) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/purchase-history/` + id + `?delivery_status=` + delivery + `&payment_status=` + payment;
    console.log(this.url);

    return this.http.get(this.url, { headers: headers });
  }
  public vieworderdetail(id: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/purchase-history-details/` + id;
    return this.http.get(this.url, { headers: headers });
  }
  public vieworderitems(id: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/purchase-history-items/` + id;
    return this.http.get(this.url, { headers: headers });
  }
  // paymenttype
  public fetchpaytype(is_buynow:any) {
    this.url = `${this.endPoint1}/payment-types?is_buynow=`+ is_buynow + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid+`&temp_user_id=`+ this.currrent_temp_Id;
    console.log(this.url);
    return this.http.get(this.url);
  }
  // placeorder
  public placeorder(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/order/store`;
    return this.http.post(this.url, body, { headers: headers });
  }




  // razorpay
  public razorpay1(body: any) {
    this.url = `${this.endPoint1}/razorpay/pay-with-razorpay`;
    return this.http.post(this.url, body);
  }


  public razorpay3() {
    this.url = `${this.endPoint1}/razorpay/pay-with-razorpay?payment_type=cart_payment&combined_order_id=111&amount=82&user_id=8`;
    window.open(this.url);
    return this.http.get<any>(`https://neophroncrm.com/spiceclubnew/api/v2/razorpay/payment`)
  }


  // razorpay test
  public razorpay2(body: any): Observable<any> {
    this.url = `${this.endPoint1}/razorpay/pay-with-razorpay`;
    return this.http.post(this.url, body).pipe(map((response: any) => response.json())
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
  razorpayment(id: any) {
    this.url = `${this.endPoint1}/razorpay/payment?razorpay_payment_id=` + id;
    console.log(this.url);

    return this.http.get(this.url);
  }
  razsuccess(body: any) {
    this.url = `${this.endPoint1}/razorpay/success`;
    console.log(this.url);
    return this.http.post(this.url, body);
  }
  razfailure(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/order/paymentfailed`;
    console.log(this.url);
    return this.http.post(this.url, body, { headers: headers });


  }
  retrypayment(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/order/repayment`;
    return this.http.post(this.url, body, { headers: headers });
  }

  //category
  public getallcat() {
    this.url = `${this.endPoint1}/categories`;
    return this.http.get(this.url);
  }
  public gethomecat() {
    this.url = `${this.endPoint1}/home-categories?user_id=` + this.userid + `&buyertype=` + this.buyertypeid;;
    return this.http.get(this.url);
  }
  public gettopcat() {
    this.url = `${this.endPoint1}/categories/top`;
    return this.http.get(this.url);
  }
  public getcatprod(id: any, page: any) {
    this.url = `${this.endPoint1}/products/category/` + id + '?page=' + page + '&name=&user_id=' + this.userid;
    console.log(this.url);
    return this.http.get(this.url);
  }
  public getcatdetail(id: any) {
    this.url = `${this.endPoint1}/categories/detail/` + id;
    console.log(this.url);

    return this.http.get(this.url);
  }
  public getcatsearchprod(id: any, page: any, key: any) {
    this.url = `${this.endPoint1}/products/category/` + id + '?page=' + page + '&name=' + key + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  public getsubcategoryofcat(id: any) {
    this.url = `${this.endPoint1}/sub-categories/` + id;
    return this.http.get(this.url);

  }
  public getsubcatprod(id: any, page: any) {
    this.url = `${this.endPoint1}/products/sub-category/` + id + '?page=' + page;
    console.log(this.url );
    
    return this.http.get(this.url);
  }
  public getsubcatsearchprod(id: any, page: any, key: any) {
    this.url = `${this.endPoint1}/products/sub-category/` + id + '?page=' + page + '&name=' + key + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  public getcatsubprod(link: string) {
    return this.http.get(link);
  }
  public getcatbrands(id: any) {
    this.url = `${this.endPoint1}/products/categorybrand/` + id;
    return this.http.get(this.url);
  }
  // shopbyproducts
  public getallproducts(page: any) {
    this.url = `${this.endPoint1}/products?page=` + page + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    console.log(this.url);
    return this.http.get(this.url);
  }
  public getpage(link: any) {
    return this.http.get(link);
  }
  public getpageAuth(link: any) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
  // return this.http.get(this.url, { headers: headers });
    this.url = link + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url, { headers: headers });
  }

  public getpage3(link: any, deliveryy: any, paymentt: any) {
    this.url = link + `&delivery_status=` + deliveryy + `&payment_status=` + paymentt;
    console.log(this.url);

    return this.http.get(this.url);
  }
  public getpage2(link: any, categoryy_id: any, brandd_id: any, sort: string, min: any, max: any) {
    this.url = link + `&categories=` + categoryy_id + `&brands=` + brandd_id + `&min=` + min + `&max=` + max + `&sort_key=` + sort + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    console.log("page url", this.url);
    return this.http.get(this.url);
  }
  // productbybrand

  public getbrandprod(id: string, page: any,) {
    this.url = `${this.endPoint1}/products/brand/` + id + '?page=' + page + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    console.log("brand url", this.url);
    return this.http.get(this.url);
  }
  public getbrandsearchprod(id: string, page: any, key: any) {
    this.url = `${this.endPoint1}/products/brand/` + id + '?page=' + page + '&name=' + key + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }

  //prod detail
  public getproddetail(id: string) {
    this.url = `${this.endPoint1}/products/` + id + `?buyertype=` + this.buyertypeid;
    console.log("product call url", this.url);
    return this.http.get(this.url);
  }
  public getcatprodbyid(id: string) {
    this.url = `${this.endPoint1}/products/category/` + id + `?page=1&name=` + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }

  public getbulckdisc(b_id: string, P_id: any) {
    this.url = `${this.endPoint1}/buyertypepricing/bulkproduct?buyertype=` + b_id + `&product_id=` + P_id;
    return this.http.get(this.url);
  }
  public getdisc(b_id: string, P_id: any) {
    this.url = `${this.endPoint1}/buyertypepricing?buyertype=` + b_id + `&product_id=` + P_id;
    return this.http.get(this.url);
  }
  public getdiscountprice(b_id: any, P_id: any, var_value: any, qty: any) {
    this.url = `${this.endPoint1}/products/discountprice?id=` + P_id + `&variant=` + var_value + `&quantity=` + qty + `&buyertype=` + b_id;
    return this.http.get(this.url);
  }
  public getdiscountpricefromdetail(b_id: any, P_id: any, var_value: any, qty: any,varpackage:any) {

    if(varpackage!==undefined && varpackage!==null ){
      varpackage=varpackage.replace(/\s/g, "")
      this.url = `${this.endPoint1}/products/discountprice?id=` + P_id + `&variant=` + var_value +`-`+varpackage + `&quantity=` + qty + `&buyertype=` + b_id;
    }
    else{
      this.url = `${this.endPoint1}/products/discountprice?id=` + P_id + `&variant=` + var_value + `&quantity=` + qty + `&buyertype=` + b_id;
    } 
    return this.http.get(this.url);
  }
  //related product
  public getrelatedprod(id: string) {
    this.url = `${this.endPoint1}/products/related/` + id + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }

  public getalsoboughtprod(id: string) {
    this.url = `${this.endPoint1}/products/boughtpro/` + id + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }

  public addvarient(id: string, varient: any,) {
    this.url = `${this.endPoint1}/products/variant/price?id=` + id + `&color=` + `&variants=` + varient + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    console.log("varient url", this.url);
    return this.http.get(this.url);
  }
  public addvarientfromdetail(id: string, varient: any,varpackage:any) {
    console.log("varpackage url", varpackage);
    if(varpackage!==undefined && varpackage!==null ){
      console.log("varient url if",varpackage);
      this.url = `${this.endPoint1}/products/variant/price?id=` + id + `&color=` + `&variants=` + varient +`,`+varpackage + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    } 
    else{
      console.log("varient url else",varpackage);
      this.url = `${this.endPoint1}/products/variant/price?id=` + id + `&color=` + `&variants=` + varient + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    }
   
    console.log("varient url", this.url);
    return this.http.get(this.url);
  }
  public getsortprod(sort: string, min: any, max: any) {
    this.url = `${this.endPoint1}/products/search?min=` + min + `&max=` + max + `&sort_key=` + sort + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  public getsortprod2(sort: string) {
    this.url = `${this.endPoint1}/products/search?sort_key=` + sort + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  public filterdataa(category: any, brand: any, name: any, sort: any, min: any, max: any) {
    this.url = `${this.endPoint1}/products/search?categories=` + category + `&brands=` + brand + `&name=` + name + `&sort_key=` + sort + `&name=` + `&min=` + min + `&max=` + max + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    console.log("price url", this.url);
    return this.http.get(this.url);
  }
  public filterdataa2(min: any, max: any) {
    this.url = `${this.endPoint1}/products/search?categories=&brands=&name=&min=` + min + `&max=` + max + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }
  public filterdataa3(page: any, category: any, brand: any, min: any, max: any, sort: any) {
    this.url = `${this.endPoint1}/products/search?page=` + page + `&categories=` + category + `&brands=` + brand + `&name=` + `&min=` + min + `&max=` + max + `&sort_key=` + sort + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    console.log(this.url);
    return this.http.get(this.url);
  }
  public filtersearchdataa(name: any) {
    this.url = `${this.endPoint1}/products/search?name=` + name + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }

  //search list
  getsearchlist(search: any) {
    this.url = `${this.endPoint1}/products/searchproductlist?name=` + search + `&user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }

  //flashdeal
  public getprodbyflash(id: any, page: any) {
    this.url = `${this.endPoint1}/flash-deal-products/` + id ;
    console.log(this.url);
    return this.http.get(this.url);
  }
  public getallflashdeal() {
    this.url = `${this.endPoint1}/flash-deals` + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }

  public getallflashdealproducts() {
    this.url = `${this.endPoint1}/flash-deal-productslist`;
    console.log(this.url);
    return this.http.get(this.url);
  }
  public gettodaysoffer() {
    this.url = `${this.endPoint1}/todayoffer?user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url);
  }

  public getsubscribebanner() {
    this.url = `${this.endPoint1}/subscriptionbanners`;
    return this.http.get(this.url);
  }
  //review
  public addreview(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/reviews/submit`;
    return this.http.post(this.url, body, { headers: headers });
  }
  public getproductcomments(id: string) {
    this.url = `${this.endPoint1}/reviews/product/` + id;
    return this.http.get(this.url);
  }
  //shops
  public getallshop() {
    this.url = `${this.endPoint1}/shops`;
    return this.http.get(this.url);
  }

  public getshopdetails(id: string) {
    this.url = `${this.endPoint1}/shops/details/` + id;
    return this.http.get(this.url);
  }
  public getnewarrival(id: string) {
    this.url = `${this.endPoint1}/shops/products/new/` + id;
    return this.http.get(this.url);
  }
  public getshopfeatured(id: string) {
    this.url = `${this.endPoint1}/shops/products/featured/` + id;
    return this.http.get(this.url);
  }
  public gettopshop(id: string) {
    this.url = `${this.endPoint1}/shops/products/top/` + id;
    return this.http.get(this.url);
  }

  public fetchwallet(id: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/wallet/balance/` + id;
    return this.http.get(this.url, { headers: headers });
  }
  public fetchrechisttory(id: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/wallet/history/` + id;
    return this.http.get(this.url, { headers: headers });
  }
  //recipe
  public getallrecipecat() {
    this.url = `${this.endPoint1}/recipe/categories`;
    return this.http.get(this.url);
  }
  public getrecipebycat(id: string, page: any) {
    this.url = `${this.endPoint1}/recipe/category/` + id + `?page=` + page;
    return this.http.get(this.url);
  }
  public getrecipedetail(id: string) {
    this.url = `${this.endPoint1}/recipe/` + id;
    return this.http.get(this.url);
  }
  public getcomments(id: string) {
    this.url = `${this.endPoint1}/recipecomment/recipe/` + id;
    return this.http.get(this.url);
  }
  public addrecipecomment(body: any) {
    this.url = `${this.endPoint1}/recipecomment/submit`;
    return this.http.post(this.url, body);
  }
  public getallrecipe(page: any) {
    this.url = `${this.endPoint1}/recipe` + `?page=` + page;
    return this.http.get(this.url);
  }

  //blog
  public getallblog(page: any) {
    this.url = `${this.endPoint1}/blog` + `?page=` + page;
    console.log("this.url",this.url);
    
    return this.http.get(this.url);
  }
  public getbestblog(id: any) {
    this.url = `${this.endPoint1}/blog/bestof/` + id;
    return this.http.get(this.url);
  }
  public getallblogcat() {
    this.url = `${this.endPoint1}/blog/categories`;
    return this.http.get(this.url);
  }
  public getblogbycat(id: string, page: any) {
    this.url = `${this.endPoint1}/blog/category/` + id + `?page=` + page;
    return this.http.get(this.url);
  }
  public getblogdetail(id: string) {
    this.url = `${this.endPoint1}/blog/` + id;
    return this.http.get(this.url);
  }
  public getblogcomments(id: string) {
    this.url = `${this.endPoint1}/blogcomment/blog/` + id;
    return this.http.get(this.url);
  }
  public addblogcomment(body: any) {
    this.url = `${this.endPoint1}/blogcomment/submit`;
    return this.http.post(this.url, body);
  }
  public searchblog(key: any) {
    this.url = `${this.endPoint1}/blogcomment/submit`;     ////////////////////////add search//////////////////////////////////////
    return this.http.get(this.url);
  }
  public searchbyblog(key: any) {
    this.url = `${this.endPoint1}/blogcomment/submit`;     ////////////////////////add search//////////////////////////////////////
    return this.http.get(this.url);
  }


  //feedbacks
  public getfeedbacks() {
    this.url = `${this.endPoint1}/feedback`;
    return this.http.get(this.url);
  }
  public addfeedback(body: any) {
    this.url = `${this.endPoint1}/feedback/submit`;
    return this.http.post(this.url, body);
  }
  //coupan
  public appycoupan(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/coupon-apply`;
    return this.http.post(this.url, body, { headers: headers });
  }
  public removecoupan(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/coupon-remove`;
    return this.http.post(this.url, body, { headers: headers });
  }

  //profile
  public getcountes(id: string) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/profile/counters/` + id;
    return this.http.get(this.url, { headers: headers });

  }
  public updateProfile(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/profile/update`;
    return this.http.post(this.url, body, { headers: headers });
  }
  public changeimg(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/profile/update-image`;
    return this.http.post(this.url, body, { headers: headers });
  }
  // conversation
  public addconv(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/chat/create-conversation`;
    return this.http.post(this.url, body, { headers: headers });
  }
  public getallconv(id: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/chat/conversations/` + id;
    return this.http.get(this.url, { headers: headers });
  }
  public getallmessages(id: string) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/chat/messages/` + id;
    return this.http.get(this.url, { headers: headers });
  }
  public sendmessages(body: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/chat/insert-message`;
    return this.http.post(this.url, body, { headers: headers });
  }
  public getnewmessages(convid: any, lastid: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/chat/get-new-messages/` + convid + `/` + lastid + `?Content-Type=` + "application/json" + `&Authorization=Bearer` + this.accesstoken;
    return this.http.get(this.url, { headers: headers });
  }
  public quickorder(id: any,) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/quickorder/` + id;
    return this.http.get(this.url, { headers: headers });
  }

  
  public getallQuickorderproducts() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer' + ' ' + this.accesstoken) 
    this.url = `${this.endPoint1}/quickorder/getproducts?user_id=` + this.userid + `&buyertype=` + this.buyertypeid;
    return this.http.get(this.url, { headers: headers });
  }


  // billdesk
  // https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=74&amount=188.00&user_id=8

  public billdeskpay(combined_order_id: any, amount: any, user_id: any,repayment:any) {
    const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer' + ' ' + this.accesstoken)
    this.url = `${this.endPoint1}/billdesk/pay-with-billdesk?requestfrom=`+ repayment +`&payment_type=cart_payment&combined_order_id=` + combined_order_id + `&amount=` + amount + `&user_id=` + user_id;
     window.open(this.url,'_self');
    console.log("billdeskpay service file,",this.url);
    return this.http.get(this.url, { headers: headers });


    //   return  this.http.get(this.url)
    //   .pipe( map((res) => {
    //     var stringified = JSON.stringify(res);
    //    // var parsedObj = JSON.parse(res);

    //    console.log("cer:",stringified);
    //   //  return res;
    //  })
    // )


    //  .pipe(map((response: any) => response.json()));  

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
  public billdeskpayment(): Observable<string> {
    this.url = `https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=135&amount=395.00&user_id=8`
    // window.open(this.url);
    return this.http.get<any>(this.url)

  }


  // public billdeskpayment(): Observable<Car[]> {
  //   this.url =`https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=74&amount=188.00&user_id=8`
  // console.log("urlll=",this.url);
  //   return this.http.get(this.url).pipe(
  //     map((res: Response) => {
  //       let body = res.json();
  //       return body || { };
  //     }));

  // }

  public emailsubscribe(body: any) {
    this.url = `${this.endPoint1}/subscriber/add`;
    return this.http.post(this.url, body)

  }
  public fetchpayment() {
    this.url = `${this.endPoint1}/footer/paymentgateway`;
    return this.http.get(this.url);
  }
  public fetchfacebookurl() {
    this.url = `${this.endPoint1}/social/getlink/facebook`;
    return this.http.get(this.url);
  }
  public fetchyoutubeurl() {
    this.url = `${this.endPoint1}/social/getlink/youtube`;
    return this.http.get(this.url);
  }
  public fetchinstagramurl() {
    this.url = `${this.endPoint1}/social/getlink/instagram`;
    return this.http.get(this.url);
  }
  public fetchtwitterurl() {
    this.url = `${this.endPoint1}/social/getlink/twitter`;
    return this.http.get(this.url);
  }
  public fetchlinkedurl() {
    this.url = `${this.endPoint1}/social/getlink/twitter`;
    return this.http.get(this.url);
  }

  public getaboutus() {
    this.url = `${this.endPoint1}/policies/custompage/about`;
    return this.http.get(this.url);
  }

  public getfaq() {
    this.url = `${this.endPoint1}/policies/custompage/faq`;
    return this.http.get(this.url);
  }

  public getreturn() {
    this.url = `${this.endPoint1}/policies/return`;
    return this.http.get(this.url);
  }

  public getcontact() {
    this.url = `${this.endPoint1}/policies/custompage/contactus`;
    return this.http.get(this.url);
  }

  public getstorelocation() {
    this.url = `${this.endPoint1}/policies/custompage/storelocation`;
    return this.http.get(this.url);
  }

  public getsupportpolicy() {
    this.url = `${this.endPoint1}/policies/support`;
    return this.http.get(this.url);
  }
}
