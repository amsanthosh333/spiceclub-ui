import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { SharedService } from 'src/app/services/shared.service'
import { LoginComponent } from 'src/app/auth/login/login.component';


// import{ SharedService} from 'src/app/services/shared.service'
// private sharedService: SharedService
// this.sharedService.sendClickEvent();
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [NgbRatingConfig,ToastrService],
})
export class CartComponent implements OnInit {

  @ViewChild('form') form!: ElementRef;
  accessCode: any;
  encRequestRes: any;
  order_no: any = 'qaz234567';
  testAmount: any = '10';
  selectedAddress: any = {
    name: 'testing',
    address: 'test address',
    city: 'test city',
    pincode: '23456',
    state: 'state test',
    phone: '1234567890'
  }
  loadingIndicator: boolean | undefined;
  Cart: any;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any; Proce: any;
  _values1 = [" 1 ", "2", " 3 ", " 4 ", " 5 ", " 6 "];
  quantityy: any;
  Summery: any;
  Address: any;
  Scost: any;
  cost: any;
  cosst: boolean = false;
  caart: boolean = true;
  owneriid: any;
  Grandtot: any;
  Paymenttype: any;
  payytype: any;
  comment!: FormGroup;
  combined_orderid: any;
  grandtotal: any;
  username: any;
  userphone: any;
  useremail: any;
  city: any;
  pincode: any;
  phone: any;
  address: any;
  state_name: any;
  encRequest: any;
  subtot: any;
  applycou: boolean = true;
  removecou: boolean = false;
  loader: boolean = true;
  cartlength: any;
  buyertypeid: any;
  search!: FormGroup;
  couponn: any;
  Summeryload: boolean=true;
  cartitems: any;
  availcoupan: any;
  Futuredpro: any;
  ClickEventSubscription!: Subscription;
  poploader: boolean =true;
  // responseText: string;

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal,
    private authService: AuthService, private fb: FormBuilder, private request: RequestService,
    private toastr: ToastrService, private toast: ToastrService, private sharedService: SharedService,config: NgbRatingConfig,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')

    );

    config.max = 5;
    config.readonly = true;
    
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.buyertypeid = this.currentdetail.user?.buyertypeid;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    this.username = this.currentdetail.user?.name;
    this.userphone = this.currentdetail.user?.phone;
    this.useremail = this.currentdetail.user?.email;

   
      this.ClickEventSubscription = this.sharedService.getcartClickEvent().subscribe(() => {
        this.viewcart();
      })
      if(this.userid == undefined){
        this.userid = 0
      }
   
    
  }

  ngOnInit(): void {
    window.scroll(0, 0)
    this.accessCode = 'YOURACCESSCODEGOESHERE';

    this.viewcart();
    this.viewcart3();
    this.availabecoupan();
    this.viewcartcount();
    this.viewfuturedpro();

    this.comment = this.fb.group({

      coupan: ['', [Validators.required]],

    });

    this.search = this.fb.group({
      qtyyy: [''],
    });
  }
  proceed() {
    if(this.userid == 0){
      this.modalService.open(LoginComponent, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'md',
      });
    }
    else{
      this.router.navigate(['checkout']);
    }

  }
  viewcart() {
    this.request.fetchusercart(this.userid,0).subscribe((response: any) => {
      this.Cart = response;
      this.cartitems=this.Cart.cart_items
      this.loader = false;

      this.owneriid = this.Cart[0]?.owner_id;
      // setTimeout(() => {
      //   this.loadingIndicator = false;
      // }, 500);
    });

  }

  deleteRecord(id: any) {

    this.request.deleteproud(id).subscribe((response: any) => {

      if (response.message == "Product is successfully removed from your cart") {
        this.viewcart();
        this.viewcart3();
        this.viewcartcount(); 
        this.deleteRecordSuccess();
        this.sharedService.sendClickEvent();
      }
      else {
        this.toastr.error(response.message);
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  viewcartcount() {
    this.request.cartcount(this.userid).subscribe((response: any) => {
      this.cartlength = response.cartcount;
    });
  }

  firstDropDownChanged(data: any, _id: any) {
    this.quantityy = data.target.value;
    let edata2 = {
      id: _id,
      quantity: this.quantityy,
      buyertype: this.buyertypeid
    }

    this.request.updatecart(edata2).subscribe((response: any) => {
      this.viewcart();
      this.viewcart3();
      this.viewcartcount();
    });
  }
  increaseqty(_id: any, qty: string) {
    let edata2 = {
      id: _id,
      quantity: qty,
      buyertype: this.buyertypeid
    }
    this.request.updatecart(edata2).subscribe((response: any) => {
      if(response.result==true){
        // this.toastr.success('Cart updated', '');
        this.viewcart();
        this.viewcart3();
        this.viewcartcount();
        this.sharedService.sendClickEvent();
      }
      else{
        this.toastr.info( response.message);
      }
    });

  }
  availabecoupan(){
    this.request.availablecoupan().subscribe((response: any) => {    
      this.availcoupan = response.data;
    });

  }
  changecoupan(e:any) {
    if(e.target.checked){ 
      this.comment.value.coupan= e.target.value
      this.comment.setValue({
        coupan: e.target.value,    
      });         
    }

    else{
      this.comment.value.coupan= ''
      this.comment.setValue({
        coupan:'',    
      });
    }
 }
  proddetail(id: any) {
    window.scroll(0, 0);
    this.router.navigate(['productdetail', id]);
  }
  getValue(val: any, _id: any,stttk:any) {

    if (val == 0) {
      val = 1
    }
    else if(val>stttk){
     val = stttk
    }
    let edata2 = {
      id: _id,
      quantity: val,
      buyertype: this.buyertypeid
    }

    this.request.updatecart(edata2).subscribe((response: any) => {
      if(response.result==true){
        // this.toastr.success('Cart updated', '');
        this.viewcart();
        this.viewcart3();
        this.viewcartcount();
        this.sharedService.sendClickEvent();
      }
      else{
        this.toastr.success( response.message);
      }
      
    });


  }

  decreaseqty(_id: any, qty: any) {
    let edata2 = {
      id: _id,
      quantity: qty,
      buyertype: this.buyertypeid
    }

    this.request.updatecart(edata2).subscribe((response: any) => {
      if(response.result==true){
        this.viewcart();
        this.viewcart3();
        this.viewcartcount();
        this.sharedService.sendClickEvent();
      }
      else{
        this.toastr.success( response.message);
      }
    });
  }
  viewcart3() {
    this.request.fetchsummery(this.userid,0,null).subscribe((response: any) => {
      this.Summery = response;
      this.Grandtot = this.Summery.grand_total
      this.subtot = this.Summery.sub_total
      this.couponn=this.Summery.coupon_applied
      this.grandtotal = this.Summery.grand_total
      this.Summeryload=false
      if( this.couponn==true){
        this.removecou = true;
        this.applycou = false;
      }
    });
   

  }

  viewfuturedpro() {
    this.request.getfuturedpro().subscribe((response: any) => {  
      this.Futuredpro = response.data;
      this.poploader = false;
     
    });
  }
  
  updatecart() {
    this.viewcart();
    this.viewcart3();
    this.viewcartcount();
    // this.toastr.success('Cart updated', '');
  }
 
  shippingcost(row: any) {
    this.city = row.city_name;
    this.pincode = row.postal_code;
    this.phone = row.phone;
    this.address = row.address;
    this.state_name = row.state_name

    let edata2 = {
      user_id: this.userid,
      address_id: row.id
    }
    let edata = {
      owner_id: this.owneriid,
      user_id: this.userid,
      city_name: row.city_name
    }

    this.request.updateshippingaddress(edata2).subscribe((response: any) => { 
    });
    this.request.fetchcost(edata).subscribe((response: any) => {
      this.Scost = response;
      this.cost = this.Scost.value_string   
    });

  }
 
  selectpaytype(row: any) {
    this.payytype = row.payment_type
  }
  placeorder() {
    let edata = {
      owner_id: this.owneriid,
      user_id: this.userid,
      payment_type: this.payytype
    }
    if (this.payytype == "billdesk_payment") {
      this.request.placeorder(edata).subscribe((response: any) => {
        this.combined_orderid = response.combined_order_id
        if (response.result == true) {

          this.billdesk()
        }
        else {
          this.toastr.error(response.message);
        }
      });
    }
    else if (this.payytype == "razorpay") {
      this.request.placeorder(edata).subscribe((response: any) => {
        this.combined_orderid = response.combined_order_id
        if (response.result == true) {

          this.razorpay()
        }
        else {
          this.toastr.error(response.message);
        }
      });
    }

    else {
      this.request.placeorder(edata).subscribe((response: any) => {
        this.combined_orderid = response.combined_order_id;
        if (response.result == true) {
          this.toastr.success(response.message);
        }
        else {
          this.toastr.error(response.message);
        }
      });
    }

  }
  //    options = {
  //     "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
  //     "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     "currency": "INR",
  //     "name": "Acme Corp",
  //     "description": "Test Transaction",
  //     "image": "https://example.com/your_logo",
  //     "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     "handler": function (response:any){
  //         alert(response.razorpay_payment_id);
  //         alert(response.razorpay_order_id);
  //         alert(response.razorpay_signature)
  //     },
  //     "prefill": {
  //         "name": "Gaurav Kumar",
  //         "email": "gaurav.kumar@example.com",
  //         "contact": "9999999999"
  //     },
  //     "notes": {
  //         "address": "Razorpay Corporate Office"
  //     },
  //     "theme": {
  //         "color": "#3399cc"
  //     }
  // };
  // var rzp1 = new Razorpay(options);
  // rzp1.on('payment.failed', function (response){
  //         alert(response.error.code);
  //         alert(response.error.description);
  //         alert(response.error.source);
  //         alert(response.error.step);
  //         alert(response.error.reason);
  //         alert(response.error.metadata.order_id);
  //         alert(response.error.metadata.payment_id);
  // });

  billdesk() {
  
    this.request.billdeskpay(this.combined_orderid, this.grandtotal.replace('Rs', ""), this.userid,null)
      .subscribe(
        (response: any) => {
          response.json()
 
        },

        //     },
        (error: any) => {
          console.log(error);
        });
  }


  billdesk2() {
    this.http.get<any>('https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=74&amount=188.00&user_id=8').subscribe(
      data => {
      },
      (err: HttpErrorResponse) => {
        console.log("err", err);
        if (err.error instanceof Error) {
          console.log("Client side error");
        }
        else {
          console.log("Sever side error");
        }
      });
  }

  // (response: any) => { 
  //   this.encRequest = response.encRequest;
  //   console.log("desktype",this.encRequest);  
  //   response.json(results);      
  //   var object = JSON.parse(response);
  //   var results = JSON.parse(object); 
  //   console.log("ressss",results);   
  //   console.log("ressss",object); 
  //   console.log("billdesktype",response);        
  // },

  // (   data: { [x: string]: any; }) => {
  //   console.log('------', data)
  //     console.log('-------', data['response'])
  //     var payhere_checkout_form =  document.getElementById('billdesk-checkout-form');
  //     console.log('formmmm',payhere_checkout_form)
  //     console.log('-----------', data)
  //     this.encRequestRes = data['response']; 
  //         // setTimeout(()=>{
  //         //     this.form.nativeElement.submit();
  //         // },1000)
  //     },



  razorpay() {
  
    // this.request.razorpayment(this.combined_orderid).subscribe((response: any) => {
    //   console.log("razorpayment",response);   
    // });
  }
  applycoupan(form: FormGroup) {
    let edata2 = {
      user_id: this.userid,
      owner_id: this.owneriid,
      coupon_code: form.value.coupan,
    }

    this.request.appycoupan(edata2).subscribe((res: any) => {
      if (res.message == 'Coupon Applied') {
        this.removecou = true;
        this.applycou = false;
        this.toastr.success('Coupon Applied', '');
        
        this.updatecart();
      }
      else if (res.message == 'Invalid coupon code!') {
        this.toastr.error('Invalid coupon code!', '');

      }
      else {
        this.toastr.error(res.message);
      }
    }, (error: any) => {
      this.toastr.error(error);
      console.log("error", error);

    });

  }
  removecoupon() {
    let edata2 = {
      user_id: this.userid,
      owner_id: this.owneriid,
    }
    this.request.removecoupan(edata2).subscribe((res: any) => {
      if (res.result == true) {
        this.removecou = false;
        this.applycou = true;
        this.toastr.success('Coupon Removed', '');
       
        this.viewcart3();
        this.availabecoupan();
      }
      else if (res.message == 'Invalid coupon code!') {
        this.toastr.error('Invalid coupon code!', '');

      }
      else {
        this.toastr.error(res.message);
      }
    }, (error: any) => {
      this.toastr.error(error);
      console.log("error", error);

    });

  }

  // razorpay
  initPay() {
    console.log("initPay,")
    var ref = this;
    return {
      "key": "rzp_test_HTQz79bVMhpN4L", // Enter the Key ID generated from the Dashboard
      "amount": this.grandtotal.replace('Rs', ""), // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      "name": 'Pay',
      "currency": "INR",
      "order_id": this.combined_orderid,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      "image": 'https://angular.io/assets/images/logos/angular/angular.png',
      "handler": function (response: any) {
        ref.handlePayment(response);
      },
      "prefill": {
        "name": this.username,
        "email": this.useremail,
        "contact": this.userphone
      },
      "theme": {
        "color": "#2874f0"
      }
    };
  }

  handlePayment(response: { razorpay_payment_id: any; }) {
  }

  addRecordSuccess() {
    this.toastr.success('Added Successfully', '');
  }
  editRecordSuccess() {
    this.toastr.success('Edit Record Successfully', '');
  }
  deleteRecordSuccess() {
    this.toastr.error(' Removed Successfully', '');
  }

}