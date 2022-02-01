import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl,  Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; 
import { RequestService } from 'src/app/services/request.service'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
 import { ConfirmedValidator } from '../confirmedValidator';
 import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ToastrService],
})
export class SignupComponent implements OnInit {
//  buyer= [  
//     { id: '1', name: 'customer' },
//     { id: '2', name: 'seller' },
//     { id: '3', name: 'b2b' },  
//   ];
  Regby = [  
    { id: 'email', name: 'email' },
    { id: 'phone', name: 'phone' },  
  ];
  registerForm: FormGroup;
  submitted: boolean | undefined;
  otpform!: FormGroup;
  userid: any;
  buyer: any;
  error2: any;
  error3: any;
  constructor( private router: Router,private fb: FormBuilder,private request: RequestService, 
     private authService: AuthService,private toastr: ToastrService,private formBuilder: FormBuilder,private modalService: NgbModal,) {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required], 
      Mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)], ],
      password: ['', Validators.required], 
      confirmpassword: ['', Validators.required],
      register_by: ['', Validators.required],
      buyer_type: ['', Validators.required],
    },
    {
      validator: ConfirmedValidator('password', 'confirmpassword')
    }
    );
    
   }

   ngOnInit(): void {
    this.getbyertype();
    this.otpform = this.fb.group({ 
      otp: ['', [Validators.required]], 
    });
  }
  get f1() {  
    return this.otpform.controls;
  }
  get f() {
    return this.registerForm.controls;  
  }
  getbyertype(){
    this.request.getbyertype().subscribe((res:any)=> {
      this.buyer=res.data
      console.log("buertype",this.buyer) 
    },
   )  
  }
  onSubmit(content: any) {
   
    this.submitted = true;
    this.error2 = '';
    if (this.registerForm.invalid) {
      console.log("form invalid")
      this.error2 = '* Enter all details';
      return;
    } else {
       let edata={
             name:""+this.registerForm.controls['fname'].value,
             email:""+this.registerForm.controls['email'].value,
             phone:""+this.registerForm.controls['Mobile'].value,
             password:""+this.registerForm.controls['password'].value,
             passowrd_confirmation:""+this.registerForm.controls['confirmpassword'].value,
             register_by:""+this.registerForm.controls['register_by'].value,  
             buyer_type:""+this.registerForm.controls['buyer_type'].value,
           }
           console.log("reg",edata)

      this.authService.adduser(edata).subscribe(
        (res: any) => {
          console.log("response",res);
          this.userid =res.user_id
          if (res.message == "Registration Successful. Please verify and log in to your account.") {
            console.log("registerForm",""+res.result);
            console.log("response",res);
            this.toastr.success('Registration Successfully', '');
            this.modalService.open(content, {
              ariaLabelledBy: 'modal-basic-title',
              size: 'md',
            });
          }else if(res.message == "User already exists.") {
            console.log("user alredy exist");
          
            this.error2 = res.message
            
          }
           else  {
            console.log("failresult",""+res.message);
            this.error2= res.message
          }
        },
        
      );
    } 

  }

  onAddRowSave(form: FormGroup) {
    this.error3 = '';
    if (this.otpform.invalid) {
      console.log("form invalid",);   
       this.error3 = '* Enter OTP';
     }
    let edata1={
      user_id: this.userid,
      verification_code:""+this.otpform.controls['otp'].value,
      // mobile_no :""+this.registerForm.controls['Mobile'].value,
    }
    this.authService.registerotpverification(edata1) .subscribe(
      (res) => {
        console.log("responseee",""+res);
        if (res.message == "Code does not match, you can request for resending the code") { 
            console.log("Code does not match");
            this.error3 = '*Code does not match,you can request for resending the code';
            // this.error1 = 'Incorrect OTP!!Please Try Again!!!!';  
         
        } else {
           console.log("Code matched");
           this.router.navigate(['/home']);
          // this.error1 = 'Invalid Login';
        }
      },
      (error1) => {
        // this.error1 = error1;
        console.log("fail1",error1);
        this.submitted = false;
      }
    );
    // this.request.addsellerotp(seller).subscribe(
    //   (res: any) => {
    //     if (res.login_status == "1") {
    //       console.log("registerForm",""+res.login_status);
    //       localStorage.setItem('currentUser', JSON.stringify(res));
    //       this.currentUserSubject.next(res);
    //       this.modalService.dismissAll();
    //       this.router.navigate(['/dashboard/main']);
    //     } else if (res.login_status == "0") {
         
    //     }
    //   },
    //   error => {
       
    //   }
    // );
    
  }
  resend(){
    let edata2={
      user_id: this.userid,
      register_by:""+this.registerForm.controls['register_by'].value,
      // mobile_no :""+this.registerForm.controls['Mobile'].value,
     
    }
       console.log("resend data",edata2);
    this.authService.resendotp(edata2).subscribe(
      (res) => {
        console.log("responseee",""+res);
        // if (res.message == "Code does not match, you can request for resending the code") { 
        //     console.log("Code does not match");
        //     // this.error1 = 'Incorrect OTP!!Please Try Again!!!!';  
         
        // } else {
        //    console.log("Code  matched");
        //    this.router.navigate(['/main']);
        //   // this.error1 = 'Invalid Login';
        // }
      },
      (error1) => {
        console.log("fail");
        // this.error1 = error1;
        this.submitted = false;
      }
    );
  }
}
