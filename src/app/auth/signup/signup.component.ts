import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmedValidator } from '../confirmedValidator';
import { ToastrService } from 'ngx-toastr';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { SharedService } from 'src/app/services/shared.service';
import { NgxSpinnerService } from "ngx-spinner";
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ToastrService],
})
export class SignupComponent implements OnInit {

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
  verloading!: boolean;
  resendloading!: boolean;
  btnloading: boolean = false;
  s_logintype: any;
  provider: any;
  s_username: any ;
  s_useremail: any;
  s_usermobile: any;
  s_useraccessToken: any;
  errorb: any;
  byertypeform: FormGroup;
  buer_type: any;
  show: boolean=false;
  show2: boolean=false;
  constructor(private router: Router, private fb: FormBuilder, private request: RequestService,
    private authService: AuthService,private spinner: NgxSpinnerService, private sharedService: SharedService, private toastr: ToastrService, private formBuilder: FormBuilder, private modalService: NgbModal,) {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      Mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)],],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],

      buyer_type: ['', Validators.required],
    },
      {
        validator: ConfirmedValidator('password', 'confirmpassword')
      }
    );

    this.byertypeform = this.fb.group({
      buyer_type: ['', [Validators.required]],
    });
    
  }
  ngOnInit(): void {
    this.getbyertype();
    this.otpform = this.fb.group({
      otp: ['', [Validators.required]],
    }); 
  }
  password() {
    this.show = !this.show;
}
password2() {
  this.show2 = !this.show2;
}
  get f1() {
    return this.otpform.controls;
  }
  get f() {
    return this.registerForm.controls;
  }
  getbyertype() {
    this.request.getbyertype().subscribe((res: any) => {
      this.buyer = res.data
    },
    )
  }
  openverify(content: any){
    this.modalService.dismissAll()
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  onSubmit(content: any) {
    // this.modalService.open(content, {
    //             ariaLabelledBy: 'modal-basic-title',
    //             size: 'md',
    //           });
    this.submitted = true;
    this.btnloading = true;
    this.error2 = '';

    if (this.registerForm.invalid) {
      if (!this.registerForm.get('fname')?.valid) {
        this.error2 = '*Enter your name';
      }
      else if (!this.registerForm.get('Mobile')?.valid) {
        this.error2 = '*Enter mobile number';
      }
      else if (!this.registerForm.get('email')?.valid) {
        this.error2 = '*Enter your emailId';
      }
      else if (!this.registerForm.get('password')?.valid) {
        this.error2 = '*Enter Password';
      }
      else if (!this.registerForm.get('confirmpassword')?.valid) {
        this.error2 = '*Re-enter the correct password';
      }
      else if (!this.registerForm.get('buyer_type')?.valid) {
        this.error2 = '*Select Buyer type';
      }
      this.btnloading = false;
      return;
    } else {
      let edata = {
        name: "" + this.registerForm.controls['fname'].value,
        email: "" + this.registerForm.controls['email'].value,
        phone: "" + this.registerForm.controls['Mobile'].value,
        password: "" + this.registerForm.controls['password'].value,
        passowrd_confirmation: "" + this.registerForm.controls['confirmpassword'].value,
        buyer_type: "" + this.registerForm.controls['buyer_type'].value,
      }
      this.authService.adduser(edata).subscribe(
        (res: any) => {
          this.userid = res.user_id
          if (res.result == true) {
            this.toastr.success('Registered Successfully', '');
            this.modalService.dismissAll()
            this.modalService.open(content, {
              ariaLabelledBy: 'modal-basic-title',
              size: 'md',
            });
            this.btnloading = false;
            
          } else if (res.result == false) {
            this.error2 = res.message
            this.btnloading = false;
          }
          else {
            this.error2 = res.message;
            this.btnloading = false;
          }
        },

      );
    }

  }

  onAddRowSave(form: FormGroup) {
    this.error3 = '';
    if (this.otpform.invalid) {
      this.error3 = '* Enter OTP';
    }
    else {
      let edata1 = {
        user_id: this.userid,
        verification_code: "" + this.otpform.controls['otp'].value,
      }
      this.verloading = true;
      this.authService.registerotpverification(edata1).subscribe(
        (res) => {
          this.verloading = false;
          if (res.result == true) {
            this.toastr.success('Your account is verified', '');
            this.modalService.dismissAll();
            // this.openlogin();
            this.router.navigate(['/home']).then(() => { 
              window.location.reload();
            });
          } else {
            this.error3 = '*Code does not match,you can request for resending the code';

            // this.error1 = 'Invalid Login';
          }
        },
        (error1) => {
          this.verloading = false;
          console.log("fail1", error1);
          this.submitted = false;
        }
      );
    }
  }
  openlogin(){
    this.modalService.open(LoginComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  resend() {
    this.resendloading = true
    let edata2 = {
      user_id: this.userid,
      email_or_phone: this.registerForm.controls['email'].value,

    }
    this.authService.resendotp(edata2).subscribe(
      (res) => {
        this.resendloading = false;
        if (res.result == true) {
          this.toastr.success(res.message);
        }
        else {
          this.toastr.info(res.message);
        }

      },
      (error1) => {
        this.resendloading = false
        console.log("fail",error1);
        this.submitted = false;
      }
    );
  }

  loginWithGoogle(content: any) {
    const provider = new GoogleAuthProvider();
    this.provider = provider
    this.s_logintype = "google"
    const auth = getAuth();
    signInWithPopup(auth, this.provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        this.s_username = user.displayName;
        this.s_useremail = user.email;
        this.s_usermobile = user.phoneNumber;
        this.s_useraccessToken = token;
        if (user) {
          this.validateuser(content);
        }
      }).catch((error) => {
        console.log("error", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  loginWithFacebook(content: any) {
    this.s_logintype = "facebook"
    const provider = new FacebookAuthProvider();
    this.provider = provider;
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        this.s_username = user.displayName;
        this.s_useremail = user.providerData[0].email;
        this.s_usermobile = user.providerData[0].phoneNumber;
        this.s_useraccessToken = token;
        if (user) {
          this.validateuser(content);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });

  }
  submitbyertype(form: FormGroup) {
    this.errorb = ''
    if (this.byertypeform.invalid) {
      this.errorb = '*select buyertype';
    }
    this.buer_type = form.value.buyer_type
    let edata1 = {
      name: this.s_username,
      email: this.s_useremail,
      phoneNumber: this.s_usermobile,
      provider: this.s_useraccessToken,
      loginby: this.s_logintype,
      buyertype: this.buer_type
    }
    this.authService.sociallogin3(edata1).subscribe(
      (res) => {
        if (res.result = true) {
          this.modalService.dismissAll();
          this.sharedService.sendClickEvent();
          this.toastr.success('logged in Successfully', '');
          this.router.navigate(['/home'])
            .then(() => {
              window.location.reload();
            });
        } else {
          this.toastr.error('', res.message);
        }
      },
      (error) => {
        console.log("fail1", error);
      }
    );
  }
  validateuser(content: any) {
    let edata1 = {
      name: this.s_username,
      email: this.s_useremail,
      phoneNumber: this.s_usermobile,
      provider: this.s_useraccessToken,
      loginby: this.s_logintype,
    }
    this.spinner.show();
    this.authService.sociallogin(edata1).subscribe(
      (res) => {
        if (res.result = true) {
          if (res.count == 0) {
            this.spinner.hide();
            this.modalService.dismissAll();
            this.modalService.open(content, {
              ariaLabelledBy: 'modal-basic-title',
              size: 'sm',
            });
          }
          else {
            let edata1 = {
              name: this.s_username,
              email: this.s_useremail,
              phoneNumber: this.s_usermobile,
              provider: this.s_useraccessToken,
              loginby: this.s_logintype,
            }
            this.authService.sociallogin3(edata1).subscribe(
              (res) => {
                this.spinner.hide();
                if (res.result = true) {
                  this.sharedService.sendClickEvent();
                  this.toastr.success('logged in Successfully', '');
                  this.router.navigate(['/home'])
                    .then(() => {
                      window.location.reload();
                    });
                } else {
                  this.toastr.error('', res.message);
                }
              },
              (error) => {
                console.log("fail1", error);
              }
            );
          }
        } else {
          this.toastr.error('', res.message);
        }
      },
      (error) => {
        console.log("fail1", error);
      }
    );
  }

  closemodel() {
    this.modalService.dismissAll();
    this.modalService.open(LoginComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
}
