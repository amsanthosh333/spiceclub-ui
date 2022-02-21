import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { windows } from 'ngx-bootstrap-icons';
import { ConfirmedValidator } from 'src/app/auth/confirmedValidator';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  providers: [NgbRatingConfig, ToastrService],
})
export class WalletComponent implements OnInit {
  checkedColumns = {};
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any; Proce: any;
  currentdetail: User;
  Wishlist: any;
  loadingIndicator: boolean | undefined;
  Wlength: any;
  Cart: any;
  owneriid: any;
  cartlength: any;
  loader: boolean = true;
  Orders: any;
  orderlength: any;
  editForm!: FormGroup;
  error3: any;
  cardImageBase64: any;
  isImageSaved!: boolean;
  filename: any;
  profilee: any;
  Wallet: any;
  History: any;
  rechargeForm: FormGroup;
  paymentdetails: any;
  razpaysuccess: any;
  username: any;
  userphone: any;
  useremail: any;
  rechargeamount: any;
  constructor(private spinner: NgxSpinnerService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private request: RequestService,
    private modalService: NgbModal,private authService: AuthService) {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser') || '{}')
      );
  
      this.currentUser = this.currentUserSubject.asObservable();
      this.currentdetail = this.currentUserSubject.value;
      this.userid = this.currentdetail.user?.id;
      this.accesstoken = this.currentdetail.access_token;
      this.tokentype = this.currentdetail.token_type;
      this.username = this.currentdetail.user.name;
      this.userphone = this.currentdetail.user.phone;
      this.useremail = this.currentdetail.user.email;

      this.rechargeForm = this.fb.group({
        amount:['',[Validators.required]],
      
     },
       
       );
     }

  ngOnInit(): void {
    window.scroll(0,0)
    this.getwallet();
    this.getrechargehistory();
  }
  getwallet(){
    this.request.fetchwallet(this.userid).subscribe((response: any) => {
      this.Wallet=response; 
      this.loader=false;          
    });
  }

  getrechargehistory(){
    this.request.fetchrechisttory(this.userid).subscribe((response: any) => {
      this.History=response.data;
      this.loader=false          
    });
  }
  openrecharge(content: any){
    
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
    });
}
onproceed(form: FormGroup) {   
    this.error3=''
    if (this.rechargeForm.invalid) {  
      this.error3="* Enter amount"
      // form.reset();
      return;
    }
     else {
      
       this.rechargeamount= form.value.amount;     
  
        let options = {
          "key": "rzp_test_DYDr3B0KYe4086",
          "amount": form.value.amount*100,
          "currency": "INR",
          "name": "Spice Club",
          "description": "Wallet Recharge",
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
            "color": "#f0240a"
          },
          "handler": (response: any) => {
           this. razpaysuccess= response
           this.razorpaypayment();
          }  
        };
        
        let rzp1 = new this.authService.nativeWindow.Razorpay(options);
        rzp1.open(); 
    }
  }

  razorpaypayment(){
    this.spinner.show();
    this.request.razorpayment(this.razpaysuccess.razorpay_payment_id).subscribe((response: any) => {
      if(response.result==true){
        this.paymentdetails=response.payment_details  
        this.razorpaysuccess();
      }

    }, );
  }
  razorpaysuccess(){
    // this.spinner.show();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
    let edata4={
      payment_details:this.paymentdetails,
      payment_type: "wallet_payment",
      amount: this.rechargeamount, 
      user_id: this.userid
    }
    
    this.request.razsuccess(edata4).subscribe((response:any)=>{
      if(response.message=="Payment is successful"){ 
        this.modalService.dismissAll()
        this.spinner.hide();
        this.toastr.success('Payment is successful',''); 
        this.getwallet();
          this.getrechargehistory();
      }
      else{
        alert(response.message)
        this.modalService.dismissAll()
        this.toastr.error('',response.message);
      }
    })
  }

}


