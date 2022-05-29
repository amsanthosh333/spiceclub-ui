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
  btnloading: boolean=false;
  constructor( private router: Router,private fb: FormBuilder,private request: RequestService, 
     private authService: AuthService,private toastr: ToastrService,private formBuilder: FormBuilder,private modalService: NgbModal,) {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required], 
      Mobile: ['', [Validators.required ,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)], ],
      password: ['', Validators.required], 
      confirmpassword: ['', Validators.required],
    
      buyer_type: ['', Validators.required],
    },
    {
      validator: ConfirmedValidator('password','confirmpassword')
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
    },
   )  
  }
  onSubmit(content: any) { 
    this.submitted = true;
    this.btnloading=true;
    this.error2 = '';
    if (this.registerForm.invalid) {
      this.error2 = '* Enter all details';
      this.btnloading=false;
      return;
    } else {
       let edata={
             name:""+this.registerForm.controls['fname'].value,
             email:""+this.registerForm.controls['email'].value,
             phone:""+this.registerForm.controls['Mobile'].value,
             password:""+this.registerForm.controls['password'].value,
             passowrd_confirmation:""+this.registerForm.controls['confirmpassword'].value,    
             buyer_type:""+this.registerForm.controls['buyer_type'].value,
           }
      this.authService.adduser(edata).subscribe(
        (res: any) => {
          this.userid =res.user_id
          if (res.result == true) {
            this.toastr.success('Registered Successfully', '');
            this.modalService.open(content, {
              ariaLabelledBy: 'modal-basic-title',
              size: 'md',
            });
            this.btnloading=false;
          }else if(res.result == false) {      
            this.error2 = res.message
            this.btnloading=false;
          }
           else  {
            this.error2= res.message;
            this.btnloading=false;
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
     else{
    let edata1={
      user_id: this.userid,
      verification_code:""+this.otpform.controls['otp'].value,
    }
    this.verloading=true;
    this.authService.registerotpverification(edata1) .subscribe(
      (res) => {
        console.log( res);
        this.verloading=false;
        if (res.result == true) { 
          console.log("iffff");
          this.toastr.success('Your account is verified', '');
          this.modalService.dismissAll();
          this.router.navigate(['/login']);
        } else {
          console.log("elseee");
          this.error3 = '*Code does not match,you can request for resending the code';
       
          // this.error1 = 'Invalid Login';
        }
      },
      (error1) => {
        this.verloading=false;
        console.log("fail1",error1);
        this.submitted = false;
      }
    );
  }
  }
  resend(){
    this.resendloading=true
    let edata2={
      user_id: this.userid,
      email_or_phone: this.registerForm.controls['email'].value,
     
    }
    console.log("edata2",edata2);
    this.authService.resendotp(edata2).subscribe(
      (res) => {
        console.log("resend response",res);
        this.resendloading=false;
        if(res.result==true){
          this.toastr.success(res.message);
        }
        else{
          this.toastr.info(res.message);
        }

      },
      (error1) => {
        this.resendloading=false
        console.log("fail"); 
        this.submitted = false;
      }
    );
  }
  closemodel(){
    console.log("close");
    
    this.modalService.dismissAll()
  }
}
