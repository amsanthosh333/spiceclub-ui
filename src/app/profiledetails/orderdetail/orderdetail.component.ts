import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import{ SharedService} from 'src/app/services/shared.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css'],
  providers: [ToastrService],
})
export class OrderdetailComponent implements OnInit {

 

  //Demo purpose only, Data might come from Api calls/service
  public counts = ["Order Placed","Confirmed","Picked Up","On The Way","Delivered"];
  //  public orderStatus ="Delivered"
  currentRate = 0;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  Orders: any;
  prdid: any;
  Items: any;
  Detail: any;
  loadingIndicator: boolean | undefined;
  page2: boolean=true;
  page1: boolean=false;
  product_iddd: any;
  register!: FormGroup;
  _values2 = [" 1 ", "2", " 3 "," 4 "," 5 "];
  buyertypeid: any;
  username: any;
  userphone: any;
  useremail: any;
  loader:boolean=true;
  ord_id: any;
  delivery_status: any;
  orderStatus: any;
  error1: any;
  orderid: any;
  grandtotal_value: any;
  razpaysuccess: any;
  paymentdetails: any;
  combined_orderid: any;
  loadingg: boolean=false;
  constructor(private http: HttpClient,private router: Router,private modalService: NgbModal,
    private authService: AuthService,private fb: FormBuilder,private request: RequestService,
    private toastr: ToastrService, private toast: ToastrService,private route: ActivatedRoute,
    private sharedService: SharedService,private spinner: NgxSpinnerService,) {
   this.currentUserSubject = new BehaviorSubject<User>(
     JSON.parse(localStorage.getItem('currentUser')||'{}')
     
   );
   
   this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid=this.currentdetail.user.id;
    this.buyertypeid=this.currentdetail.user?.buyertypeid;
    this.accesstoken=this.currentdetail.access_token;
    this.tokentype=this.currentdetail.token_type;
    this.username=this.currentdetail.user.name;
    this.userphone=this.currentdetail.user.phone;
    this.useremail=this.currentdetail.user.email;

  }

  ngOnInit(): void {
    this.ord_id = this.route.snapshot.params['id'];
    this.viewdetail();
    this.viewitem();

    this.register = this.fb.group({ 
      rating:['',[ Validators.required]],
      comment: ['',[ Validators.required]],
    });

  }
  get f() {
    return this.register.controls;
  }

  viewdetail(){
    this.request.vieworderdetail(this.ord_id).subscribe((response: any) => {
      console.log("response deatail",response);
      
      this.Detail=response.data;
      this.orderStatus=this.Detail[0].delivery_status_string;
      this.grandtotal_value=this.Detail[0].grand_total.replace(/[^0-9\.-]+/g,"");
      this.combined_orderid =this.Detail[0].combined_order_id
      console.log(" this.grandtotal_value", this.grandtotal_value);

      this.orderid=this.Detail[0].id;
    }
    ); 
  }

  viewitem(){

    this.request.vieworderitems(this.ord_id).subscribe((response: any) => {
      console.log("ITEMS",response);
      
    this.Items=response.data;   
    this.loader=false;  
      
    }
    ); 
  }
  addcomment(form: FormGroup,id:any){
    this.error1 = '';
    if (this.register.invalid) {
  
      if(!this.register.get('rating')?.valid){
        this.error1 = '*give star';
      }
      else if ( !this.register.get('comment')?.valid) {
        this.error1 = '*type some comment';
      }
      return;
    } 
    else{
      if (isNaN(form.value.rating)) {
        console.log("ratinggsss", form.value.rating);
        form.value.rating = 0
      }
        let edata2={
          product_id:id,
          user_id: this.userid,
          rating:form.value.rating,
          comment:form.value.comment,
        }
    this.request.addreview(edata2).subscribe((res: any) => {
      console.log(res);
      
      if (res.result == true) { 
        this.toastr.success('Comment  Submitted', '');      
        // this.getcommentsss();
        this.modalService.dismissAll()
      }
      else  {

        this.toastr.info(res.message);
  
      }
    }, (error: any) => {
      console.log("error",error);  
    }); 
  }
  }

  addreview(content:any,_id:any){
   this.product_iddd=_id;
   this.modalService.open(content, {
     ariaLabelledBy: 'modal-basic-title',
     size: '50px',
   });
 }
 submitreview(form: FormGroup){
  this.error1 = '';
  
  if (this.register.invalid) {

    if(!this.register.get('rating')?.valid){
      this.error1 = '*give star';
    }
    else if ( !this.register.get('comment')?.valid) {
      this.error1 = '*type some comment';
    }  
    return;
  }
  else{
      let edata2={
        product_id:this.product_iddd,
        user_id: this.userid,
        rating:form.value.rating,
        comment:form.value.comment,
      }
  this.request.addreview(edata2).subscribe((res: any) => {
    console.log("addreview",res);
    
    if (res.result == true) { 
      this.toastr.success('Review  Submitted', '');    
      this.modalService.dismissAll();   
    }
    else  {
      this.toastr.info(res.message);
      this.modalService.dismissAll(); 

    }
  }, (error: any) => {
    console.log("error",error);  
  });
 }
}
proddetail(id:any){
  window.scroll(0,0);
  this.router.navigate(['productdetail', id]);
}
quickorder(){
  // this.spinner.show();
  this.loadingg=true
  this.request.quickorder(this.orderid).subscribe((res:any)=>{
    if(res.result==true){
      // this.spinner.hide();     
      this.toastr.success('Added to cart', '');
      this.sharedService.sendClickEvent();
      this.loadingg=false;
      this.router.navigate(['cart']);
    }
    else{
      this.spinner.hide();
      this.toastr.info('', res.message);
    }
  });
}

paynow1(){
  let edata1 = {
    combined_order_id: this.combined_orderid,
    payment_type:"cart_payment"
  }
  console.log(edata1);
  
  this.request.retrypayment(edata1).subscribe((response: any) => {
    console.log("razorpay1 response", response);
    if (response.result == true) {
      this.toastr.success('',response.message);
      let edata1 = {
        payment_type: "cart_payment",
        combined_order_id: this.combined_orderid,
        amount: this.grandtotal_value,
        user_id: this.userid,
      }
      this.billdesk(edata1)
      // this.paynow();
    }
    else{
      this.toastr.success('',response.message);
    }
  });
}

billdesk(edata1: any) {
  console.log("billdest called");
  this.request.billdeskpay(edata1.combined_order_id, edata1.amount, edata1.user_id,"repayment").subscribe(
    (response: any) => {
      
      response.json()
      console.log("billdesktype", response.json());
      console.log("billresponse", response);
    },
  );
}

paynow(){
let edata1 = {
  payment_type: "cart_payment",
  combined_order_id: this.combined_orderid,
  amount: this.grandtotal_value,
  user_id: this.userid,
}
this.initPay(edata1);

}
initPay(edata: any) {
  let options = {
    "key": "rzp_test_DYDr3B0KYe4086",
    "amount": edata.amount * 100,
    "currency": "INR",
    "name": "Spice Club",
    "description": "Test Transaction",
    "image": "assets/images/LOGOWHITE.jpg",
    "order_id": "",
    // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    // "handler": function (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }) {
    //   alert(response.razorpay_payment_id);
    //   alert(response.razorpay_order_id);
    //   alert(response.razorpay_signature)
    //   console.log("razzzerrespnse",response.razorpay_payment_id);
    //   // this.razorpayid = response.razorpay_payment_id

    // },
    // "handler": this.paymentResponseHander(response);

    "prefill": {
      "name": this.username,
      "email": this.useremail,
      "contact": this.userphone
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#f0240a"
    },
    "handler": (response: any) => {
      this.razpaysuccess = response
      console.log(this.razpaysuccess);
      this.spinner.show();
      this.razorpaypayment();
    }
  };
  console.log("options,", options)

  let rzp1 = new this.authService.nativeWindow.Razorpay(options);
  rzp1.open();
  // console.log("works");
}

razorpaypayment() {
  //  this.spinner.show();
  this.request.razorpayment(this.razpaysuccess.razorpay_payment_id).subscribe((response: any) => {
    console.log("razorpay1 response", response);
    if (response.result == true) {
      this.paymentdetails = response.payment_details
      this.razorpaysuccess();
    }
    else{
      this.toastr.error('Something went wrong', '');
    }
  });
}
razorpaysuccess() {
  let edata4 = {
    payment_details: this.paymentdetails,
    payment_type: "cart_payment",
    combined_order_id: this.combined_orderid,
    amount: this.grandtotal_value,
    user_id: this.userid,
  }
  console.log("razorpaysuccess method ");
  this.request.razsuccess(edata4).subscribe((response: any) => {
    if (response.message == "Payment is successful") {
      this.sharedService.sendClickEvent();
      this.spinner.hide();
      alert(response.message)
      this.toastr.success('Payment is successful', '');
      const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
    }
    else {
      alert(response.message)
      this.toastr.error(response.message);
    }
  })
}
}
