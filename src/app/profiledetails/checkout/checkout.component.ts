import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { SharedService } from 'src/app/services/shared.service'
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [ToastrService, PaymentService],

})
export class CheckoutComponent implements OnInit {
  review: boolean = false;
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

  radioSel: any;
  radioSelected: any;
  radioSelectedString!: string;


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
  addresssss: FormGroup;
  state_name: any;
  encRequest: any;
  subtot: any;
  applycou: boolean = true;
  removecou: boolean = false;
  shippingfee: any;
  terms!: FormGroup;
  error2: any;
  shippaddress: boolean = false;
  City: any;
  State: any;
  Country: any;
  country_id: any;
  state_id: any;
  register!: FormGroup;
  error3: any;
  tax: any;
  address_id: any;
  loader: boolean = true;
  grandtotal_value: any;
  paypage: any;
  razorpay_payment_id: any;
  raz_pay_id: any;
  paymentResponseHander: any;
  razpaysuccess: any;
  paymentdetails: any;
  indexx: any;
  curshipaddress: any;
  address: any;
  shipadds: boolean = true;
  dis: any;
  nocart: boolean = false;
  loadingg: boolean = false;
  winRef: any;
  buynowvalue: any;
  buyvalue: any;
  couponn: any;
  Summeryload: boolean = true;
  availcoupan: any;
  cartloader: boolean = true;
  loadaddress: boolean = true;
  paymentload: boolean = true;
  paymentmethod: any;
  codcharge: any;
  showCod: boolean = false;
  totalprodprice!: any;
  without_dis: any;
  // responseText: string;

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal, private appcomp: AppComponent,
    private authService: AuthService, private fb: FormBuilder, private request: RequestService,
    private toastr: ToastrService, private toast: ToastrService, private activatedRoute: ActivatedRoute,
    private sharedService: SharedService, private payservice: PaymentService, private spinner: NgxSpinnerService) {

      this.appcomp.hideheadernavbar();

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user.id;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    this.username = this.currentdetail.user.name;
    this.userphone = this.currentdetail.user.phone;
    this.useremail = this.currentdetail.user.email;
    this.terms = this.fb.group({
      type: ['', [Validators.required]],


    });
    this.register = this.fb.group({
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],

    });
    this.addresssss = this.fb.group({
      addresss: [''],
    })

    this.comment = this.fb.group({
      coupan: ['', [Validators.required]],
    });

  

  }
  ngOnInit(): void {

    window.scroll(0, 0)
    this.buyvalue = this.activatedRoute.snapshot.params['id'];
    if (this.buyvalue == undefined || this.buyvalue == null) {
      this.buynowvalue = 0;
      // this.viewsummery();
      this.viewcart();
      this.paymettype();
      this.viewcountry();
      this.viewstate();
      this.viewCity();
      this.getaddress();
      this.availabecoupan();

    }
    else {
      this.buynowvalue = this.buyvalue;
      // this.viewsummery();
      this.viewcart();
      this.paymettype();
      this.viewcountry();
      this.viewstate();
      this.viewCity();
      this.getaddress();
      this.availabecoupan();
    }
  }

  getSelecteditem() {
    this.radioSel = this.Paymenttype.find((Paymenttype: { payment_type_key: string; }) => Paymenttype.payment_type_key === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }

  onItemChange(item: any) {
    this.payytype = item;
    if (this.payytype == "billdesk") {
      this.paymentmethod = "Billdesk"
      this.showCod = false;
      this.viewsummery();
    }
    // else if (this.payytype == "razorpay") {
    //   this.paymentmethod= "Razorpay"}
    else if (this.payytype == "cash_on_delivery") {
      this.paymentmethod = "Cash On Delivery"
      this.showCod = true;
      this.viewsummery();

    }
    else {
      this.paymentmethod = "Cash On Delivery"
    }
    this.getSelecteditem();
  }
  viewcart() {
    this.request.fetchusercart(this.userid, this.buynowvalue).subscribe((response: any) => {
      this.Cart = response;
      if(this.Cart.length==0){
         this.router.navigate(['/home']);
      }
      this.cartloader = false;
      this.owneriid = this.Cart[0]?.owner_id;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });

  }
  viewsummery() {
    this.request.fetchsummery(this.userid, this.buynowvalue, this.payytype).subscribe((response: any) => {
      this.Summery = response;
      this.Grandtot = this.Summery.grand_total;
      this.dis = this.Summery.discount;
      this.subtot = this.Summery.sub_total;
      this.without_dis = this.Summery?.subtotal_withoutdiscount
      // var without_dis = Number(this.Summery.sub_total.replace(/[^0-9\.-]+/g,""));
      // var disc =  Number(this.Summery.discount.replace(/[^0-9\.-]+/g,""));
      // this.totalprodprice = (without_dis + disc).toFixed(2)   
      // console.log("number",this.totalprodprice);
      this.shippingfee = this.Summery.shipping_cost;
      this.tax = this.Summery.tax;
      this.grandtotal = this.Summery.grand_total;
      this.grandtotal_value = this.Summery.grand_total_value;
      this.codcharge = this.Summery.codcharges
      this.couponn = this.Summery.coupon_applied;

      this.Summeryload = false;
      if (this.couponn == true) {
        this.removecou = true;
        this.applycou = false;
      }
    });
  }
  availabecoupan() {
    this.request.availablecoupan().subscribe((response: any) => {
      this.availcoupan = response.data;

    });

  }
  changecoupan(e: any) {
    if (e.target.checked) {
      this.comment.value.coupan = e.target.value
      this.comment.setValue({
        coupan: e.target.value,
      });
    }

    else {
      this.comment.value.coupan = ''
      this.comment.setValue({
        coupan: '',
      });
    }
  }

  getaddress() {
    this.loader = true
    this.loadaddress = true
    this.request.fetchaddress(this.userid).subscribe((response: any) => {
      this.Address = response.data;
      this.loadaddress = false
      this.loader = false;
      if (this.Address.length === 0) {
        this.shipadds = false
        this.opennewaddress();
      }
      else {
        this.shipadds = true
        this.indexx = this.Address.findIndex((x: any) => x.set_default == 1);
        this.address_id = this.Address[this.indexx]?.id
        this.curshipaddress = this.Address[this.indexx]
        if (this.address_id == undefined) {
          this.address_id = this.Address[0]?.id
          this.curshipaddress = this.Address[0]
          this.shippingcost(this.curshipaddress)
          this.getaddress();
        }
        else {
          // this.shippingcost(this.curshipaddress)
          let edata2 = {
            user_id: this.userid,
            address_id: this.address_id
          }

          this.request.updateshippingaddress(edata2).subscribe((response: any) => {
            if (response.result == true) {
            }
          });
        }
      }
    });
  }
  paymettype() {
    this.request.fetchpaytype(this.buynowvalue).subscribe((response: any) => {
      this.Paymenttype = response;
      this.paymentload = false;
      // this. processdata()    
    });
  }

  shippingcost(row: any) {
    this.address_id = row?.id;
    this.city = row?.city_name;
    this.pincode = row?.postal_code;
    this.phone = row?.phone;
    this.address = row?.address;
    this.state_name = row?.state_name

    let edata2 = {
      user_id: this.userid,
      address_id: row.id
    }
    let edata = {
      owner_id: this.owneriid,
      user_id: this.userid,
      city_name: row.city_name
    }
    let edata5 = {
      user_id: this.userid,
      id: row.id,
    }

    this.request.makeshipingaddress(edata5).subscribe((res: any) => {
      if (res.result == true) {
        this.request.fetchaddress(this.userid).subscribe((response: any) => {
          this.Address = response.data;
          this.toastr.success('Address Updated Successfully', '');
        });
        // this.getaddress();
        this.request.updateshippingaddress(edata2).subscribe((response: any) => {
          if (response.result == true) {
          }
        });

      }
      else {
        console.log("error");
      }
    });


  }
  deleteRow(row: any) {
    this.request.deleteaddress(row.id).subscribe((response: any) => {
      if (response.result == true) {
        this.modalService.dismissAll();
        this.toastr.error('Removed Successfully', '');
        this.getaddress();

      }
      else {
        this.modalService.dismissAll();
      }
    });
  }

  findInvalidControls(f: FormGroup) {
    const invalid = [];
    const controls = f.controls;

  }

  placeorder(form: FormGroup) {
    this.error2 = '';
    if (this.address_id == undefined) {
      this.error2 = '*Please Add Address';
    }

    else if (this.terms.invalid) {
      if (!this.terms.get('type')?.valid) {
        this.error2 = '*Please Select Payment Option';
      }
      // else if (!this.terms.get('terms')?.valid) {
      //   this.error2 = '*please accept terms & conditions';
      // }
      return;
    }
    else {
      this.review = true;
      this.appcomp.hideheader();

    }
  }

  billdesk(edata1: any) {
    this.request.billdeskpay(edata1.combined_order_id, edata1.amount, edata1.user_id, null).subscribe(
      (response: any) => {
        response.json()
      },
    );
  }

  finallyplaceorder() {
    this.loadingg = true
    let edata = {
      owner_id: this.owneriid,
      user_id: this.userid,
      payment_type: this.payytype,
      is_buynow: this.buynowvalue
    }
    if (this.payytype == "billdesk") {
      this.paymentmethod = "Billdesk"
      this.request.placeorder(edata).subscribe((response: any) => {
        this.combined_orderid = response.combined_order_id;
        if (response.result = true) {
          this.sharedService.sendClickEvent();
          let edata1 = {
            payment_type: "cart_payment",
            combined_order_id: this.combined_orderid,
            amount: this.grandtotal_value,
            user_id: this.userid,
          }
          this.billdesk(edata1)
        }
        else {
          this.toastr.error(response.message);
        }
      });
    }
    else if (this.payytype == "razorpay") {
      this.paymentmethod = "Razorpay"
      this.request.placeorder(edata).subscribe((response: any) => {
        this.combined_orderid = response.combined_order_id
        if (response.result == true) {
          this.sharedService.sendClickEvent();
          let edata1 = {
            payment_type: "cart_payment",
            combined_order_id: this.combined_orderid,
            amount: this.grandtotal_value,
            user_id: this.userid,
          }
          // razorpay final
          this.initPay(edata1);
        }
        else {
          this.toastr.error(response.message);
        }
      });
    }
    else {
      this.paymentmethod = "Cash On Delivery"
      this.request.placeorder(edata).subscribe((response: any) => {
        this.combined_orderid = response.combined_order_id
        if (response.result == true) {
          this.toastr.success('Order placed');
          this.sharedService.sendClickEvent();
          this.loadingg = false
          this.router.navigate(['/orders']);
        }
        else {
          this.toastr.error(response.message);
        }
      });
    }
  }

  backtocheckpage() {
    this.review = false
    this.appcomp.showheader();

    // this.header.emit(this.userName);
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
        this.viewsummery();
        this.toastr.success('Coupon Applied', '');

        // this.updatecart();
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
        this.viewsummery();
        this.availabecoupan();
        this.comment.setValue({
          coupan: '',
        });
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
  opennewaddress() {
    this.shippaddress = !this.shippaddress
    this.viewcountry();
    this.viewstate();
    this.viewCity();
  }
  viewcountry() {
    this.request.fetchcountry().subscribe((response: any) => {
      this.Country = response.data;
    });
  }
  selectcountry(event: any) {
    this.country_id = event.target.value;
    this.request.fetchstatebycountry(this.country_id).subscribe((response: any) => {
      this.State = response.data;

    });

  }
  viewstate() {
    this.request.fetchstate().subscribe((response: any) => {
      this.State = response.data;

    });
  }
  selectstate(event: any) {
    this.state_id = event.target.value;
    this.request.fetchcitybystate(this.state_id).subscribe((response: any) => {
      this.City = response.data;
    });

  }
  viewCity() {
    this.request.fetchCity().subscribe((response: any) => {
      this.City = response.data;

    });
  }
  onAddRowSave(form: FormGroup) {
    this.error3 = '';
    if (this.register.invalid) {

      if (!this.register.get('phone')?.valid) {
        this.error3 = '*enter phone number';
      }
      else if (!this.register.get('country')?.valid) {
        this.error3 = '*select country';
      }
      else if (!this.register.get('address')?.valid) {
        this.error3 = '*enter address';
      }
      else if (!this.register.get('state')?.valid) {
        this.error3 = '*select state';
      }
      else if (!this.register.get('city')?.valid) {
        this.error3 = '*select city';
      }
      else if (!this.register.get('postal_code')?.valid) {
        this.error3 = '*enter postalcode';
      }

      return;
    }
    else {
      const edata = {
        user_id: this.userid,
        address: form.value.address,
        country_id: form.value.country,
        state_id: form.value.state,
        city_id: form.value.city,
        postal_code: form.value.postal_code,
        phone: form.value.phone,
      }

      this.request.addaddress(edata).subscribe((res: any) => {
        if (res.message == 'Shipping information has been added successfully') {
          form.reset()
          this.reloadCurrentRoute();
          window.scroll(0, 0);
        }
        else {
          this.toastr.error(res.message);
          form.reset();
        }
      }, (error: any) => {
        console.log("error", error);
        this.toastr.error(error.message);
        form.reset();

      });
    }
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
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

  spiiner() {
    this.spinner.show();
  }

  initPay(edata: any) {
    const options: any = {
      key: 'rzp_test_DYDr3B0KYe4086',
      amount: edata.amount * 100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: "Spice Club", // company name or product name
      description: "Test Transaction",  // product description
      image: "assets/images/LOGOWHITE.jpg", // company logo or product image
      order_id: "", // order_id created by you in backend
      prefill: {
        "name": this.username,
        "email": this.useremail,
        "contact": this.userphone
      },
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#f0240a'
      }
    };
    options.handler = ((response: any, error: any) => {
      options.response = response;
      this.razpaysuccess = response
      this.razorpaypayment();
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      this.paymentfailed();
      this.loadingg = false;

    });
    const rzp = new this.authService.nativeWindow.Razorpay(options);
    rzp.open();
  }

  razorpaypayment() {
    this.loadingg = true

    this.request.razorpayment(this.razpaysuccess.razorpay_payment_id).subscribe((response: any) => {
      if (response.result == true) {
        this.paymentdetails = response.payment_details
        this.razorpaysuccess();
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
    this.request.razsuccess(edata4).subscribe((response: any) => {
      if (response.result == true) {
        this.sharedService.sendClickEvent();
        this.loadingg = false
        //////////////****/ this.spinner.hide();

        alert(response.message)
        this.toastr.success('Payment is successful', '');
        this.router.navigate(['/orders']);
      }
      else {
        alert(response.message)
        this.toastr.error(response.message);
      }
    })
  }
  paymentfailed() {
    let edata5 = {
      combined_order_id: this.combined_orderid,
    }
    this.request.razfailure(edata5).subscribe((response: any) => {
    })
  }

  // //  testing billdesk
  // billdesk2() {
  //   window.open('https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=2&amount=135.69&user_id=78')
  //   this.http.get<any>('https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=2&amount=135.69&user_id=78').subscribe(
  //     data => {
  //       console.log("billdesk2 data", data);
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log("err", err);
  //       if (err.error instanceof Error) {
  //         console.log("Client side error");
  //       }
  //       else {
  //         console.log("Sever side error");
  //       }
  //     });
  // }

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

 

    //  testing billdesk
    billdesk2() {
      window.open('https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=2&amount=135.69&user_id=78')
      this.http.get<any>('https://neophroncrm.com/spiceclubnew/api/v2/billdesk/pay-with-billdesk?payment_type=cart_payment&combined_order_id=2&amount=135.69&user_id=78').subscribe(
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

}


