import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import{ SharedService} from 'src/app/services/shared.service'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [ToastrService, PaymentService],

})
export class CheckoutComponent implements OnInit {


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
  address: any;
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
  // responseText: string;

  constructor(private http: HttpClient, private router: Router, private modalService: NgbModal,
    private authService: AuthService, private fb: FormBuilder, private request: RequestService,
    private toastr: ToastrService, private toast: ToastrService, 
    private sharedService: SharedService,private payservice: PaymentService,private spinner: NgxSpinnerService) {
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
    console.log("currentuserid=", this.userid);
    console.log("currentuserdetail=", this.currentdetail);

    this.terms = this.fb.group({
      type: ['', [Validators.required]],
      terms: ['', [Validators.requiredTrue]],

    });
    this.register = this.fb.group({
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],

    });
    this.address = this.fb.group({
      addresss: [''], 
   })
  }
  ngOnInit(): void {
    this.viewsummery();
    this.viewcart();
    this.paymettype();
    this.viewcountry();
    this.viewstate();
    this.viewCity();
    this.getaddress();


  }

  getSelecteditem() {
    this.radioSel = this.Paymenttype.find((Paymenttype: { payment_type_key: string; }) => Paymenttype.payment_type_key === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }

  onItemChange(item: any) {
    console.log(item);
    this.payytype = item;
    this.getSelecteditem();
  }
  viewcart() {
    this.request.fetchusercart(this.userid).subscribe((response: any) => {
      this.Cart = response;
      // this,cart_item=this.Cart.cart_items  
      console.log("cart", response);
      console.log("owner id", this.Cart[0]?.owner_id);
      this.owneriid = this.Cart[0]?.owner_id;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });

  }
  viewsummery() {
    this.request.fetchsummery(this.userid).subscribe((response: any) => {
      this.Summery = response;
      this.Grandtot = this.Summery.grand_total
      this.subtot = this.Summery.sub_total
      this.shippingfee = this.Summery.shipping_cost
      this.tax = this.Summery.tax
      console.log("summery", response);
      console.log("grand total", this.Summery.grand_total);
      this.grandtotal = this.Summery.grand_total
      this.grandtotal_value = this.Summery.grand_total_value
    });
  }
  getaddress() {
    this.loader = true
    this.request.fetchaddress(this.userid).subscribe((response: any) => {
      this.Address = response.data;
      this.loader = false;
      this.indexx =this.Address.findIndex((x:any) => x.set_default ==1);
      console.log("Address", this.Address);
      console.log("Address index", this.indexx);
      this.address_id=this.Address[this.indexx].id

    });
    // this.paymettype();
  }
  paymettype() {
    this.request.fetchpaytype().subscribe((response: any) => {
      this.Paymenttype = response;
      console.log("Paymenttype", this.Paymenttype);
      // this. processdata()    
    });
  }
  selectpaytype(row: any) {
    console.log("paytype", row.payment_type)
    this.payytype = row.payment_type
  }
  shippingcost(row: any) {
    this.address_id = row.id;
    console.log("row id", row.city_name);
    console.log("row id", row.id);
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
    console.log("edatat", edata);
    console.log("edatat", edata2);

    this.request.updateshippingaddress(edata2).subscribe((response: any) => {
      console.log("address changed res",response); 

    // this. processdata()    
    });
    this.request.fetchcost(edata).subscribe((response: any) => {
      this.Scost=response; 
      this.cost= this.Scost.value_string
      if(response.result==true)  {
        this.viewsummery();
      } 
      console.log("Scost",this.cost);     
      console.log("Scostamount", this.Scost); 
    // this. processdata()    
    });

  }


  findInvalidControls(f: FormGroup) {
    const invalid = [];
    const controls = f.controls;

  }

  placeorder(form: FormGroup) {
    this.error2 = '';

    if (this.address_id == undefined) {
      console.log("address_id", this.address_id)
      this.error2 = '*please select address';
    }

    else
     if (this.terms.invalid) {
      if (!this.terms.get('type')?.valid) {
        this.error2 = '*please select paymenttype';
      }
      else if (!this.terms.get('terms')?.valid) {
        this.error2 = '*please accept terms & conditions';
      }
      console.log(this.error2)
      return;
    }
    else {
      let edata = {
        owner_id: this.owneriid,
        user_id: this.userid,
        payment_type: this.payytype
      }
      console.log("edatat", edata);
      if (this.payytype == "billdesk_payment") {
        console.log("paymentttttype", this.payytype)
        this.request.placeorder(edata).subscribe((response: any) => {
          console.log("Placeorder", response);
          console.log("combined_orderid", this.combined_orderid);
          this.combined_orderid = response.combined_order_id;
          if (response.result == true) {
            console.log("billdesk");

            // this.billdesk()
          }
          else {
            console.log("fail", response.message);
            this.toastr.error(response.message);
          }
        });
      }
      else if (this.payytype == "razorpay") {
        console.log("paymenttttype", this.payytype)
        this.request.placeorder(edata).subscribe((response: any) => {
          console.log("Placeorder response", response);
          this.combined_orderid = response.combined_order_id
          if (response.result == true) {
            let edata1 = {
              payment_type: "cart_payment",
              combined_order_id: this.combined_orderid,
              amount: this.grandtotal_value,
              user_id: this.userid
            }
            // this.razorpayment1(edata1);
            this.initPay(edata1);
          }
          else {
            console.log("fail", response.message);
            this.toastr.error(response.message);
          }
        });
      }
      else {
        this.request.placeorder(edata).subscribe((response: any) => {
          console.log("Placeorder", response);
          this.combined_orderid = response.combined_order_id
          if (response.result == true) {
            this.toastr.success(response.message);
            this.sharedService.sendClickEvent();
            this.router.navigate(['/home']);
            
          }
          else {
            console.log("fail", response.message);
            this.toastr.error(response.message);
          }
        });
      }
    }
  }

  razorpayment1(edata1: any) {
    console.log("edata1", edata1);
    this.request.razorpay1(edata1).subscribe((response: any) => {
      console.log("razorpay1 response", response);
    }, (error: any) => {
      console.log("error msg ", error);
    });
  }


  //test razorpay
  razorpayment2() {
    let edata1 = {
      payment_type: "cart_payment",
      combined_order_id: 111,
      amount: 82,
      user_id: 8
    }
    console.log("edata3", edata1);
    this.request.razorpay3().subscribe((response: any) => {
      response.json();
      console.log("razorpay1 response", response);
      console.log("razorpay1 response json", response.json());
    },
    );
  }

  //test razorpay
  razzzzorpay() {
    let edata1 = {
      payment_type: "cart_payment",
      combined_order_id: 111,
      amount: 82,
      user_id: 8
    }
    console.log("edata1", edata1);
    this.request.razorpay2(edata1).subscribe((response: any) => {
      console.log("razorpay1 response", response);
    },);

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
      console.log("country", this.Country);

    });
  }
  selectcountry(event: any) {
    this.country_id = event.target.value;
    console.log("country id", this.country_id);
    this.request.fetchstatebycountry(this.country_id).subscribe((response: any) => {
      this.State = response.data;
      console.log("newstates", this.State);

    });

  }
  viewstate() {
    this.request.fetchstate().subscribe((response: any) => {
      this.State = response.data;
      console.log("state", this.State);

    });
  }
  selectstate(event: any) {
    this.state_id = event.target.value;
    console.log("state_id", this.state_id);
    this.request.fetchcitybystate(this.state_id).subscribe((response: any) => {
      this.City = response.data;
      console.log("newCity", this.City);

    });

  }
  viewCity() {
    this.request.fetchCity().subscribe((response: any) => {
      this.City = response.data;
      console.log("City", this.City);

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
      console.log(this.error3)
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
      console.log(edata);

      this.request.addaddress(edata).subscribe((res: any) => {
        console.log(res);
        if (res.message == 'Shipping information has been added successfully') {
          this.toastr.success('Shipping information has been added successfully', '');
          form.reset()
          this.reloadCurrentRoute();
          window.scroll(0, 0);
        }
        else {
          console.log("res", res);
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


  // razorpay site
  payWithRazor(order_id: any) {
    const options: any = {
      key: 'rzp_test_7Hdkaz1xFGPomB',
      amount: 125500,
      currency: 'INR',
      name: 'san',
      description: 'hiii',
      image: '.assets/images/LOGOWHITE.jpg',
      order_id: "",
      modal: {
        escape: false,
      },
      notes: {
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response: any, error: any) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.payservice.nativeWindow.Razorpay(options);
    rzp.open();
  }

  // "amount": this.grandtotal.replace('Rs',""),

  // demo spoicce  (working)


  initPay(edata:any) {
    let options = {
      "key": "rzp_test_DYDr3B0KYe4086",
      "amount": edata.amount*100,
      "currency": "INR",
      "name": "Spice Club",
      "description": "Test Transaction",
      "image": "assets/images/LOGOWHITE.jpg",
      "order_id":"",
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
        "color": "#3399cc"
      },
      "handler": (response: any) => {
       this. razpaysuccess= response
       console.log(this.razpaysuccess);
       this.razorpaypayment();
      }  
    };
    console.log("options,", options)
    
    let rzp1 = new this.authService.nativeWindow.Razorpay(options);
    rzp1.open(); 
    console.log("works");
  }

  razorpaypayment(){
    this.spinner.show();
    console.log("success",this.razpaysuccess.razorpay_payment_id); 
    this.request.razorpayment(this.razpaysuccess.razorpay_payment_id).subscribe((response: any) => {
      console.log("razorpay1 response", response);
      if(response.result==true){
        this.paymentdetails=response.payment_details 
      //  this.addRecordSuccess()
      //   this.toastr.success('Added Successfullyyyy', '');
        console.log(this.paymentdetails);
        
        this.razorpaysuccess();
      }

    }, );
  }
  razorpaysuccess(){
    let edata4={
      payment_details:this.paymentdetails,
      payment_type: "cart_payment",
      combined_order_id: this.combined_orderid,
      amount: this.grandtotal_value,
      user_id: this.userid,
    }
    console.log("edata4",edata4);
    
    this.request.razsuccess(edata4).subscribe((response:any)=>{
      console.log("success response",response);
      if(response.message=="Payment is successful"){ 
        console.log(response.message);
        this.spinner.hide();
        this.toastr.success('Payment is successful',''); 
        // alert(response.message)
        this.sharedService.sendClickEvent();
        this.router.navigate(['/home']);

      }
      else{
        console.log(response.message);
        alert(response.message)
        this.toastr.error('This payment has already been captured','');
      }
    })
  }
  //youtube
  options = {
    "key": "rzp_test_7Hdkaz1xFGPomB",
    "amount": "5000",
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "order_9A33XWu170gUtm",
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
      "name": "santo ",
      "email": "santo.kumar@example.com",
      "contact": "9999999999"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  rzp1: any;
  pay() {
    this.rzp1 = new this.authService.nativeWindow.Razorpay(this.options);

    this.rzp1.open();


  }
}


