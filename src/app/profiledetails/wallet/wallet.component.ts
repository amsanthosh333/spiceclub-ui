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
  constructor( private router: Router, private fb: FormBuilder, private toastr: ToastrService, private request: RequestService,
    private modalService: NgbModal,) {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser') || '{}')
      );
  
      this.currentUser = this.currentUserSubject.asObservable();
      this.currentdetail = this.currentUserSubject.value;
      this.userid = this.currentdetail.user?.id;
      this.accesstoken = this.currentdetail.access_token;
      this.tokentype = this.currentdetail.token_type;
      console.log("currentuserid=", this.userid);

      this.rechargeForm = this.fb.group({
        amount:['',[Validators.required]],
      
     },
       
       );
     }

  ngOnInit(): void {
    this.getwallet();
    this.getrechargehistory();
  }
  getwallet(){
    this.request.fetchwallet(this.userid).subscribe((response: any) => {
      this.Wallet=response; 
      this.loader=false;  
      console.log("Wallet",this.Wallet); 
      console.log("Wallet res",response);        
    });
  }

  getrechargehistory(){
    this.request.fetchrechisttory(this.userid).subscribe((response: any) => {
      this.History=response.data;
      this.loader=false   
      console.log("History",this.History); 
      // console.log("History res",response);        
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
    if (this.editForm.invalid) {
      if (!this.editForm.get('name')?.valid) {
        this.error3 = '* Enter your Name';
      }
      else if (!this.editForm.get('password')?.valid) {
        this.error3 = '* Enter newpassword';
      }
      else if (!this.editForm.get('confirm_password')?.valid) {
        this.error3 = '* Reenter  newpassword';
      }
      else if(this.editForm.invalid){
        this.error3="* Password and Confirm Password must be match."
        console.log(" * Password and Confirm Password must be match.", );
      }
 
      // form.reset();
      return;
    }
     else {
      const edata = {
        id: this.userid,
        name: form.value.name,
        password: form.value.password,
      }
      console.log("edata",edata)
      // this.request.updateProfile(edata).subscribe((response: any) => {
      //   console.log("res",response)
      //   // if (res[0].status == 'success') {
      //   //   this.modalService.dismissAll();
  
      //   //   form.reset();
          
      //   //   return true;
      //   // }
      //   // else if (res[0].status == 'error') {
      //   //   this.modalService.dismissAll();
      //   // }

      // }, (error) => {
      //   console.log(error);
      //   this.modalService.dismissAll();
      // });
    }
  }

}
