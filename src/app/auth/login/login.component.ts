import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private router: Router, private fb: FormBuilder, private request: RequestService,
    private formBuilder: FormBuilder, private authService: AuthService, private sharedService: SharedService,
    private toastr: ToastrService, private modalService: NgbModal,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')

    );
    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;

    this.ClickEventSubscription=this.sharedService.getlogout().subscribe(()=>{
      this.logout();
    })

  }
  ngOnInit(): void {
    window.scroll(0, 0);
    this.getbyertype()
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      // meeting_type:['', Validators.required]
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
      Mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      Type: ['', [Validators.required]],
      // meeting_type:['', Validators.required]
    });
    this.passwordForm = this.formBuilder.group({
      otp: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.minLength(4)]],
      // meeting_type:['', Validators.required]
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
      console.log("buertype", res)
      this.buyer = res.data;
    },
      (error: any) => {
        console.log(error);
      })

  }
  onSubmit(content: any) {
    this.error1 = ''
    if (this.loginForm.invalid) {
      console.log("err2",);
      if (!this.loginForm.get('username')?.valid) {
        this.error1 = '* Enter username';
      }
      else if (!this.loginForm.get('country')?.valid) {
        this.error1 = '* Enter password';
      }
      return;
    } else {
      this.authService
        .login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value,).subscribe((res) => {
          console.log(res);
          if (res) {
            if (res.message == "User not found") {
              this.error1 = '* User not found';
              console.log("User not found");
              return;
            }
            if (res.message == "Unauthorized") {
              this.error1 = '* Unauthorized';
              console.log("Unauthorized");
            }
            if (res.message == "Successfully logged in") {
              console.log("hiii you are logged in");
              this.toastr.success('logged in Successfully', '');

              this.sharedService.sendClickEvent();

              this.router.navigate(['/home'])
                .then(() => {
                  window.location.reload();
                });

              // this.router.navigate(['/home']);

              /////////////////// testing
              // this.otpSubmit(content)
            }
          } else {
            console.log("Invalid Login");
            this.error1 = '* Invalid Login';
            // this.toastr.error('Invalid Login', '');
          }
        },
          (error: any) => {
            console.log("test", "", error.error);
            if (error.error.message == "User not found") {
              console.log("User not found");
              this.error1 = '* User not found';
              // this.toastr.error('User not found', '');
            } else if (error.error.message == "Unauthorized") {
              this.error1 = '* Unauthorized';
              // this.toastr.error('Unauthorized', '');
              console.log("Unauthorized");
            }
            else if (error.error.message == "Please verify your account") {
              console.log("Please verify your account");
              this.toastr.info('verify your account', '');
              this.resend();
              this.otpSubmit(content)
            }
            else {
              console.log("error", error.error.message);
              this.toastr.info('', error.error.message);
            }
          }
        );
    }
  }
  logout1() {
    console.log("logggouttt")

    this.request.logout().subscribe(res => {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/login']);
        console.log(currentUrl);
      });
      this.toastr.info('You are loggedout', '');
      // this.router.navigate(['/login']);

      console.log("res", res);

      // if(res.message == "Successfully logged out"){
      // this.router.navigate(['/login']);}
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
    console.log("resend data", edata2);
    this.authService.resendotp(edata2).subscribe(
      (res) => {
        console.log("responseee", res);
        this.useer_id = res.user_id

      },
      (error1) => {
        console.log("fail", error1);
        // this.error1 = error1;
        // this.submitted = false;
      }
    );
  }
  onAddRowSave(form: FormGroup) {
    this.error2 = ''
    let edata1 = {
      user_id: this.useer_id,
      verification_code: "" + this.otpform.controls['otp'].value,
      // mobile_no :""+this.registerForm.controls['Mobile'].value,
    }
    console.log("resend data", edata1);
    this.authService.registerotpverification(edata1).subscribe(
      (res) => {
        console.log("responseee", "" + res);
        if (res.message == "Code does not match, you can request for resending the code") {
          console.log("Code does not match");
          this.error2 = 'Code does not match';
          // this.toastr.error('Code does not match', '');
          // this.error1 = 'Incorrect OTP!!Please Try Again!!!!';       
        }
        else if (res.result == true) {
          console.log("Code  matched");
          // this.toastr.error('Code does not match', '');
          this.sharedService.sendClickEvent();
          this.toastr.success('logged in Successfully', '');
          this.router.navigate(['/home'])
            .then(() => {
              window.location.reload();
            });
          // this.error1 = 'Invalid Login';
        }
        else {
          this.error2 = 'something went wrong try again';
        }
      },
      (error1) => {
        // this.error1 = error1;
        console.log("fail1", error1);

      }
    );
  }
  loginotp(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'sm',
    });
  }
  loginotpverify(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
  }

  requestloginotp(form: FormGroup, content: any) {
    this.error3 = ''
    if (this.loginotpform.invalid) {
      console.log("err2",);
      this.error3 = '* Enter correct mobile number';
      return;
    } else {
      let edata1 = {
        phone: form.value.phone,
        // mobile_no :""+this.registerForm.controls['Mobile'].value,
      }
      console.log("edata1", edata1);
      this.authService.reqotplogin(edata1).subscribe((res) => {
        console.log(res);
        this.otpuserid = res.user_id
        if (res) {
          if (res.message == "OTP code is sent to Mobile ") {
            console.log("OTP code is sent to Mobile'");
            this.modalService.open(content, {
              ariaLabelledBy: 'modal-basic-title',
              size: 'md',
            });
            return;
          }
          else if (res.result == false) {
            this.error3 = '* You Enter Details not found';
            console.log("else err");
          }
        } else {
          this.error3 = '* You Enter Details not found';
          console.log("else err");
        }
      },
        (error: any) => {
          console.log("test", "", error.error);

        }
      );
    }
  }
  verifyloginotp(form: FormGroup) {
    this.error5 = ''
    if (this.loginverifyform.invalid) {
      this.error3 = '* Enter correct mobile number';
      console.log("err2",);
      return;
    } else {
      let edata1 = {
        user_id: this.otpuserid,
        otp_code: form.value.otp_code,
        // mobile_no :""+this.registerForm.controls['Mobile'].value,
      }
      console.log("edata", edata1);
      this.authService.otplogin(edata1).subscribe((res) => {
        console.log("loginuser", res);
        if (res) {
          if (res.message == "User not found") {
            this.error5 = 'User not found';
            console.log("User not found");
            return;
          }
          if (res.message == "Unauthorized") {
            this.error5 = 'Unauthorized';
            console.log("Unauthorized");
          }
          if (res.message == "Successfully logged in") {
            console.log("hiii you are logged in");

            this.modalService.dismissAll();
            this.sharedService.sendClickEvent();
            this.toastr.success('logged in Successfully', '');
            this.router.navigate(['/home'])
              .then(() => {
                window.location.reload();
              });
          }
        } else {
          console.log("Invalid Login");
          this.error5 = 'Invalid Login';
        }
      },
        (error: any) => {
          console.log("test", "", error.error);
          if (error.error.message == "User not found") {
            this.error5 = 'User not found';
            console.log("User not found");

          } else if (error.error.message == "Unauthorized") {
            this.error5 = 'Unauthorized';
            console.log("Unauthorized");
          }
          else if (error.error.message == "Please verify your account") {
            this.error5 = 'Please verify your account';
            console.log("Please verify your account");
            this.resend();
            //  this.otpSubmit(content);      
          }
          else {
            console.log("error", error.error.message);
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
    console.log("googlelogin");
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
        console.log("user", user);
        if (user) {
          this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'sm',
          });
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
    console.log("facebooklogin");
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
        console.log("user", user);
        console.log("user", user.providerData[0].email);
        if (user) {
          this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'sm',
          });
        }


        //  let a:any;
        //  a = credential
        //  const token = a.accessToken;    
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });

  }
  submitbyertype(form: FormGroup) {
    this.buer_type = form.value.buyer_type

    this.validateuser();
  }

  validateuser() {
    let edata1 = {
      name: this.s_username,
      email: this.s_useremail,
      phoneNumber: this.s_usermobile,
      provider: this.s_useraccessToken,
      loginby: this.s_logintype,
      buyertype: this.buer_type
    }
    console.log(edata1);

    if (edata1.email == null) {
      console.log("S-user data", edata1);
      console.log("verify mail in facebook");
    }
    else {
      console.log("S-user data", edata1);
      this.authService.sociallogin(edata1).subscribe(
        (res) => {
          console.log("responseee", res);
          if (res.message == "Successfully logged in") {
            console.log("Successfully logged in");
            this.modalService.dismissAll();
            this.sharedService.sendClickEvent();
            this.toastr.success('logged in Successfully', '');
            this.router.navigate(['/home'])
              .then(() => {
                window.location.reload();
              });
           
            // this.error1 = 'Incorrect OTP!!Please Try Again!!!!';       
          } else {
            console.log("error occured");
            this.toastr.error('', res.message);
            //  this.router.navigate(['/main']);
            // this.error1 = 'Invalid Login';
          }
        },
        (error1) => {
          // this.error1 = error1;
          console.log("fail1", error1);

        }
      );
    }
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
    console.log("submited");
    if (this.forgotForm.invalid) {
      console.log("form invalid",);
      if (!this.forgotForm.get('Mobile')?.valid) {
        this.error6 = '* Enter Correct mobile number';
      }
      else if (!this.forgotForm.get('Type')?.valid) {
        this.error6 = '* Select Type';
      }
      return;
    } else {

      let edata1 = {
        email_or_phone: "" + this.forgotForm.controls['Mobile'].value,
        send_code_by: "" + this.forgotForm.controls['Type'].value,
      }
      console.log(edata1);

      this.authService.conformforgot(edata1).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            if (res.message == "A code is sent") {
              this.modalService.dismissAll()
              this.modalService.open(content, {
                ariaLabelledBy: 'modal-basic-title',
                size: 'md',
              });
              console.log("code sent to mail")
            }
          } else {
            console.log("enter registered mailid");;
          }
        },
        (error: string) => {
          console.log("test", "" + error);
        }
      );
    }
  }

  // password change
  onAddRowSave2() {
    this.error7 = ''
    console.log("submited");
    if (this.passwordForm.invalid) {
      //  this.disable=false;
      console.log("form invalid",);
      if (!this.passwordForm.get('otp')?.valid) {
        this.error7 = '* Enter OTP';
      }
      else if (!this.passwordForm.get('newpassword')?.valid) {
        this.error7 = '* Enter password';
      }
      return;
    } else {

      let edata3 = {
        verification_code: "" + this.passwordForm.controls['otp'].value,
        password: "" + this.passwordForm.controls['newpassword'].value,
      }
      console.log(edata3);
      // current user by login is stored in local storage -see authservice
      this.authService.resetpassword(edata3).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            if (res.message == "Your password is reset.Please login") {
              this.toastr.success('Reset Successfully', '');
              this.modalService.dismissAll();
              this.router.navigate(['/login']);
              window.scroll(0, 0)

            }
            else if (res.message == "No user is found") {
              this.error7 = '* Invalid code';
              console.log("Invalid code");
            }

          }
          else {
            console.log("else", res.message);
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
    let edata2 = {
      email_or_phone: "" + this.forgotForm.controls['Mobile'].value,
      verify_by: "" + this.forgotForm.controls['Type'].value,
    }
    console.log("resend data", edata2);
    this.authService.resendforgot(edata2).subscribe(
      (res) => {
        console.log("responseee", res);
        if (res.message == "A code is sent again") {
          this.error7 = '* A code is sent again';
          console.log("A code is sent again");
          // this.error1 = 'Incorrect OTP!!Please Try Again!!!!';  

        } else {
          console.log("need credentials");
          this.error7 = '* Need credentials';
          //  this.router.navigate(['/main']);
          // this.error1 = 'Invalid Login';
        }
      },
      (error1) => {
        console.log("fail");
        // this.error1 = error1;
        this.error7 = '* Something went wrong';
        // this.submitted = false;
      }
    );
  }


}







