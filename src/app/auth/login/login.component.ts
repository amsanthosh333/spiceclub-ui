import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { Subscriber } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ViewChild } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ToastrService],
})
export class LoginComponent implements OnInit {
  meetings = [
    { id: 'phone', value: 'phone' },
    { id: 'email', value: 'email' },
  ];
  forgotForm!: FormGroup;
  passwordForm!: FormGroup;
  provider: any;
  loginForm!: FormGroup;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid: any
  _values1 = [" 1 ", "2", " 3 ", " 4 ", " 5 ", " 6 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  otpform!: FormGroup;
  useer_id: any;
  loginotpform!: FormGroup;
  loginverifyform!: FormGroup;
  byertypeform!: FormGroup;
  otpuserid: any;
  s_username: any;
  s_useremail: any;
  s_provider: any;
  s_usermobile: string | null | undefined;
  s_useraccessToken: any;
  s_logintype: any;
  byertype: any;
  buyer: any;
  buer_type: any;
  error1: any;
  error2: any;
  error3: any;
  error5: any;
  error6: any;
  error7: any;
  ClickEventSubscription !: Subscription;
  errorb: any;
  btnloading!: boolean;
  loginloading!: boolean;
  fpassloading!: boolean;
  fpassotploading!: boolean;
  resendloading!: boolean;
  logbtnloading: boolean = false;
  otpinput: boolean = false;
  otpbtnloading: boolean = false;
  verifibyn: boolean = false;
  resendotp: boolean= false;
  // @ViewChild('myModal') myModal : any;

  constructor(private router: Router, private fb: FormBuilder, private request: RequestService,
    private formBuilder: FormBuilder, private authService: AuthService, private sharedService: SharedService,
    private toastr: ToastrService, private modalService: NgbModal, private spinner: NgxSpinnerService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    this.ClickEventSubscription = this.sharedService.getlogout().subscribe(() => {
      this.logout();
    })
  }


  ngOnInit(): void {
    window.scroll(0, 0);
    this.getbyertype()
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.otpform = this.fb.group({
      otp: ['', [Validators.required]],
    });

    this.loginotpform = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
    this.loginverifyform = this.fb.group({
      otp_code: ['', [Validators.required,]],
    });
    this.byertypeform = this.fb.group({
      buyer_type: ['', [Validators.required]],
    });
    this.forgotForm = this.formBuilder.group({
      Mobile: ['', [Validators.required]],
      Type: ['', [Validators.required]],
    });
    this.passwordForm = this.formBuilder.group({
      otp: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  openloginn(content: any) {
    console.log("open");
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  get f1() {
    return this.otpform.controls;
  }
  get f2() {
    return this.forgotForm.controls;
  }
  get f3() {
    return this.passwordForm.controls;
  }
  getbyertype() {
    this.request.getbyertype().subscribe((res: any) => {
      this.buyer = res.data;
    },
      (error: any) => {
        console.log(error);
      })
  }
  onSubmit(content: any) {
    this.error1 = ''
    if (this.loginForm.invalid) {
      if (!this.loginForm.get('username')?.valid) {
        this.error1 = '* Enter username';
      }
      else if (!this.loginForm.get('country')?.valid) {
        this.error1 = '* Enter password';
      }
      return;
    } else {
      this.logbtnloading = true;
      this.authService
        .login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value,).subscribe((res) => {
        console.log("res",res);
        
          if (res) {
            this.logbtnloading = false;
            if (res.message == "User not found") {
              this.error1 = '* User not found';
              return;
            }
            else if (res.message == "Unauthorized") {
              this.error1 = '* Invalid credentials';
            }
            else if (res.message == "Please verify your account") {
              this.toastr.info('verify your account', '');
              this.resend();
              this.otpSubmit(content)
            }
            else if (res.message == "Successfully logged in") {
              this.toastr.success('logged in Successfully', '');
              this.sharedService.sendClickEvent();
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });
            }
          } else {
            this.error1 = '* Invalid Login';
            this.logbtnloading = false;
          }
        },
          (error: any) => {
            this.logbtnloading = false;
            if (error.error.message == "User not found") {
              this.error1 = '* User not found';
            } else if (error.error.message == "Unauthorized") {
              this.error1 = '* Invalid credentials';
            }
            else if (error.error.message == "Please verify your account") {
              this.toastr.info('verify your account', '');
              this.resend();
              this.otpSubmit(content)
            }
            else {
              this.toastr.info('', error.error.message);
            }
          }
        );
    }
  }
  logout1() {
    this.request.logout().subscribe(res => {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/login']);
      });
      this.toastr.info('You are loggedout', '');
    })
  }
  otpSubmit(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
    });
  }
  resend() {
    let edata2 = {
      email_or_phone: this.loginForm.controls['username'].value,
      user_id: this.userid ?? null,
      register_by: "email",
    }
    this.authService.resendotp(edata2).subscribe(
      (res) => {
        console.log("resend response", res);
        if (res.result == true) {
          this.toastr.success('Verification code is sent', '');
        }
        else {
          this.toastr.info(res.message);
        }
        this.useer_id = res.user_id
      },
      (error1) => {
        console.log("fail", error1);
      }
    );
  }
  onAddRowSave(form: FormGroup) {
    this.error2 = ''
    if (this.otpform.invalid) {
      this.error2 = '* Enter code';
      return;
    } else {
      let edata1 = {
        user_id: this.useer_id,
        verification_code: "" + this.otpform.controls['otp'].value,
      }
      console.log("edata1", edata1);
      this.authService.registerotpverification(edata1).subscribe(
        (res) => {
          console.log("verification res", res);
          if (res.result == false) {
            this.error2 = 'Code does not match';
          }
          else if (res.result == true) {
            this.sharedService.sendClickEvent();
            this.toastr.success('logged in Successfully', '');
            this.router.navigate(['/home'])
              .then(() => {
                window.location.reload();
              });
          }
          else {
            this.error2 = 'something went wrong try again';
          }
        },
        (error1) => {
          this.error2 = 'something went wrong';
        }
      );
    }
  }
  loginotp(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  loginotpverify(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }


  requestloginotpnew() {
    this.error1 = ''
    if (!this.loginForm.get('username')?.valid) {
      this.error1 = '*Enter phone number';
    }
    else {
      this.otpbtnloading = true;
      let edata1 = {
        phone: "" + this.loginForm.controls['username'].value,
      }
      console.log("edata1", edata1);

      this.authService.reqotplogin(edata1).subscribe((res) => {
        this.otpuserid = res.user_id
        if (res) {
          if (res.result == true) {
            this.otpbtnloading = false;
            this.otpinput = true;
            this.verifibyn = true;
            // this.resendotp=true;
            // this.modalService.open(content, {
            //   ariaLabelledBy: 'modal-basic-title',
            //   size: 'md',
            // });
            return;
          }
          else if (res.result == false) {
            this.otpbtnloading = false;
            this.error1 = '* Not a registered mobile number';
          }
        } else {
          this.otpbtnloading = false;
          this.error1 = '*Enter correct details';
        }
      },
        (error: any) => {
          console.log("test", "", error.error);
          this.error1 = '*Some thing went wrong';
        }
      );
    }
  }
  verifyloginotpnew(content: any) {
    this.error1 = ''
    if (!this.loginForm.get('password')?.valid) {
      this.error1 = '*Enter OTP';
    }
    else {
      let edata1 = {
        user_id: this.otpuserid,
        otp_code: "" + this.loginForm.controls['password'].value,
      }
      console.log("edata otp", edata1);

      this.loginloading = true
      this.authService.otplogin(edata1).subscribe((res) => {
        this.loginloading = false
        console.log("res", res);

        if (res) {
          if (res.message == "User not found") {
            this.error1 = '* User not found';
            return;
          }
          else if (res.message == "Unauthorized") {
            this.error1 = '* Invalid credentials';
          }
          else if (res.message == "Please verify your account") {
            this.toastr.info('verify your account', '');
            this.resend();
            this.otpSubmit(content)
          }
          else if (res.result == true) {
            this.sharedService.sendClickEvent();
            this.toastr.success('logged in Successfully', '');
            this.router.navigate(['/home'])
              .then(() => {
                window.location.reload();
              });
          }
        } else {
          this.error1 = 'Invalid Login';
        }
      },
        (error: any) => {
          console.log("test", "", error.error);
          this.error1 = '*Some thing went wrong';
        }
      );
    }
  }

  requestloginotp(form: FormGroup, content: any) {
    this.error3 = ''
    if (this.loginotpform.invalid) {
      this.error3 = '* Enter correct mobile number';
      return;
    } else {
      this.btnloading = true;
      let edata1 = {
        phone: form.value.phone,
      }
      this.authService.reqotplogin(edata1).subscribe((res) => {
        this.otpuserid = res.user_id
        if (res) {
          if (res.message == "OTP code is sent to Mobile ") {
            this.btnloading = false;
            this.modalService.open(content, {
              ariaLabelledBy: 'modal-basic-title',
              size: 'md',
            });
            return;
          }
          else if (res.result == false) {
            this.btnloading = false;
            this.error3 = '* Not a registered mobile number';
          }
        } else {
          this.btnloading = false;
          this.error3 = '*Enter correct details';
        }
      },
        (error: any) => {
          console.log("test", "", error.error);

        }
      );
    }
  }
  verifyloginotp(form: FormGroup) {
    this.error1 = ''
    if (!this.loginForm.get('password')?.valid) {
      this.error1 = '*Enter OTP';
    }
    else {
      let edata1 = {
        user_id: this.otpuserid,
        otp_code: "" + this.loginForm.controls['password'].value,
      }
      this.loginloading = true
      this.authService.otplogin(edata1).subscribe((res) => {
        this.loginloading = false
        if (res) {
          if (res.result == false) {
            this.error1 = res.message;
            return;
          }
          if (res.result == true) {
            this.sharedService.sendClickEvent();
            this.toastr.success('logged in Successfully', '');
            this.router.navigate(['/home'])
              .then(() => {
                window.location.reload();
              });
          }
        } else {
          this.error1 = 'Invalid Login';
        }
      },
        (error: any) => {
          console.log("test", "", error.error);
          if (error.error.message == "User not found") {
            this.error5 = 'User not found';
          } else if (error.error.message == "Unauthorized") {
            this.error5 = '* Invalid credentials';
          }
          else if (error.error.message == "Please verify your account") {
            this.error5 = 'Please verify your account';
            this.resend();
          }
          else {
            this.toastr.error('Something went wrong', '');
            this.error5 = 'Something went wrong';
            this.modalService.dismissAll();
          }
        }
      );
    }
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
        console.log("social response", res);
        if (res.result = true) {
          console.log("social response if ");
          this.modalService.dismissAll();
          this.sharedService.sendClickEvent();
          this.toastr.success('logged in Successfully', '');
          this.router.navigate(['/home'])
            .then(() => {
              window.location.reload();
            });
        } else {
          console.log("social response else");
          this.toastr.error('', res.message);
        }
      },
      (error) => {
        console.log("fail1", error);
      }
    );
  }
  spiiner() {
    this.spinner.show();
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
        console.log("social response", res);
        if (res.result = true) {
          console.log("social response if ");
          if (res.count == 0) {
            this.spinner.hide();
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
                console.log("social response", res);
                if (res.result = true) {
                  this.sharedService.sendClickEvent();
                  this.toastr.success('logged in Successfully', '');
                  this.router.navigate(['/home'])
                    .then(() => {
                      window.location.reload();
                    });
                } else {
                  console.log("social response else");
                  this.toastr.error('', res.message);
                }
              },
              (error) => {
                console.log("fail1", error);
              }
            );
          }
        } else {
          console.log("social response else");
          this.toastr.error('', res.message);
        }
      },
      (error) => {
        console.log("fail1", error);
      }
    );
  }
  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.toastr.success('Sign-out successfully', '');
    }).catch((error) => {
    });
  }
  addRecordSuccess() {
    this.toastr.success('logged in Successfully', '');
  }
  editRecordSuccess() {
    this.toastr.success('Edit Record Successfully', '');
  }
  deleteRecordSuccess() {
    this.toastr.error(' Removed Successfully', '');
  }

  // forgot password

  forgotpass(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  onSubmit2(content: any) {
    this.error6 = ''
    if (this.forgotForm.invalid) {
      if (!this.forgotForm.get('Mobile')?.valid) {
        this.error6 = '* Enter correct email or mobile number';
      }
      else if (!this.forgotForm.get('Type')?.valid) {
        this.error6 = '* Select Type';
      }
      return;
    } else {
      console.log("reskkkk");
      let edata1 = {
        email_or_phone: "" + this.forgotForm.controls['Mobile'].value,
        send_code_by: "" + this.forgotForm.controls['Type'].value,
      }
      console.log(edata1);
      this.fpassloading = true
      this.authService.conformforgot(edata1).subscribe(
        (res) => {
          console.log("res", res);
          this.fpassloading = false
          if (res) {
            if (res.message == "A code is sent") {
              this.modalService.dismissAll()
              this.modalService.open(content, {
                ariaLabelledBy: 'modal-basic-title',
                size: 'md',
              });
            }
          } else if (res.result == false) {
            this.error6 = '* Enter registered mailid';
          }
        },
        (error: any) => {
          this.fpassloading = false
          console.log("test", "", error.error);
          if (error.error.result == false) {
            this.error6 = error.error.message;
          }
        }
      );
    }
  }

  // password change
  onAddRowSave2() {
    this.error7 = ''
    if (this.passwordForm.invalid) {
      if (!this.passwordForm.get('otp')?.valid) {
        this.error7 = '* Enter OTP';
      }
      else if (!this.passwordForm.get('newpassword')?.valid) {
        console.log("passs");

        this.error7 = '* Enter password';
      }
      return;
    } else {
      this.fpassotploading = true
      let edata3 = {
        verification_code: "" + this.passwordForm.controls['otp'].value,
        password: "" + this.passwordForm.controls['newpassword'].value,
      }
      // current user by login is stored in local storage -see authservice
      this.authService.resetpassword(edata3).subscribe(
        (res) => {
          this.fpassotploading = false
          if (res) {
            if (res.message == "Your password is reset.Please login") {
              this.toastr.success('Reset Successfully', '');
              this.modalService.dismissAll();
              this.router.navigate(['/login']);
              window.scroll(0, 0)
            }
            else if (res.message == "No user found") {
              this.error7 = '* Invalid code';
            }
          }
          else {
            this.error7 = '* Invalid code or mobile';
          }
        },
        (error: string) => {
          console.log("test", "" + error);
        }
      );
    }
  }
  resend2() {
    this.resendloading = true
    let edata2 = {
      email_or_phone: "" + this.forgotForm.controls['Mobile'].value,
      verify_by: "" + this.forgotForm.controls['Type'].value,
    }
    this.authService.resendforgot(edata2).subscribe(
      (res) => {
        this.resendloading = false
        if (res.result == true) {
          this.error7 = '* A code is sent again';
        } else {
          this.error7 = '* Need credentials';
        }
      },
      (error) => {
        console.log("fail");
        this.error7 = '* Something went wrong';
      }
    );
  }

  openregister() {
    this.modalService.dismissAll();
    this.modalService.open(SignupComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }

}




