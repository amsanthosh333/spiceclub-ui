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
import { SharedService } from 'src/app/services/shared.service'
import { EnquiryComponent } from 'src/app/profiledetails/enquiry/enquiry.component';
import { KycComponent } from 'src/app/profiledetails/kyc/kyc.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [NgbRatingConfig, ToastrService],
})
export class ProfileComponent implements OnInit {

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
  editForm: FormGroup;
  error3: any;
  cardImageBase64: any;
  isImageSaved!: boolean;
  filename: any;
  profilee: any;
  res: any;
  profiledetail: any;
  loader2: boolean=true;
  loader1: boolean=true;
  loader3: boolean=true;
  loaderimage: boolean=true;
  buyertypereal: any;
  kyc_verify_status: any;
  iskycupload: any;
  buyertypeid: any;
  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService,
     private request: RequestService,private sharedService: SharedService,
    private modalService: NgbModal,) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );

    this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid = this.currentdetail.user?.id;
    this.accesstoken = this.currentdetail.access_token;
    this.tokentype = this.currentdetail.token_type;
    this.buyertypereal = this.currentdetail.user?.buyertypereal;
    this.kyc_verify_status=this.currentdetail.user?.kyc_verify_status;
    this.iskycupload=this.currentdetail.user?.iskycupload;
    this.buyertypeid = this.currentdetail.user?.buyertypeid;

    this.editForm = this.fb.group({
      name:['',[Validators.required]],
     password: ['', [Validators.required]],
     confirm_password: ['', [Validators.required]],
   },
     {
       validator: ConfirmedValidator('password', 'confirm_password')
     }
     );

  }

  ngOnInit(): void {
    this.getprofile();
    this.viewwishlist();
    this. viewcartcount();
    this.getorders();
  }
  
  getprofile(){
    this.request.fetchuserprofile(this.userid).subscribe((response: any) => {
      this.profiledetail = response;
      console.log("this.profiledetail",this.profiledetail);
      
      this.loader=false;
      setTimeout(() => {
        this.loaderimage=false;
      }, 2000);
      
    });
  }

  viewwishlist() {
    this.request.fetchuserwishlist(this.userid).subscribe((response: any) => {
      this.Wishlist = response.data;
      this.Wlength = this.Wishlist.length;
      this.loader2=false
      this.loader = false;
    });
  }
  viewcartcount() {
    this.request.cartcount(this.userid).subscribe((response: any) => {
      this.cartlength = response.cartcount;
      this.loader1=false

    });
  }
  getorders(){
    this.request.fetchOrders(this.userid,1).subscribe((response: any) => {
      this.Orders=response.meta;  
      this.orderlength = this.Orders.total;
      this.loader3=false
         
    });
  }
  
  gotoorder(){
    window.scroll(0,0);
    this.router.navigate(['/orders']);   
  }
  gotoorder1(){
    window.scroll(0,0);
    // this.router.navigate(['/purchased']);  
    this.router.navigate(['/orders', 1], {queryParams:{delivery_status:"delivered"}}); 
  }
  gotoaddress(){
    window.scroll(0,0);
    this.router.navigate(['/address']);
  }
  gotowallet(){
    window.scroll(0,0);
    this.router.navigate(['/wallet'])
  }
  gotochats(){
    window.scroll(0,0);
    this.router.navigate(['/message'])
  }
  editprofile(content: any){
      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg',
      });
  }


  gotocart(){
    window.scroll(0,0);
    this.router.navigate(['/cart']);   
  }
  gotowishlist(){
    window.scroll(0,0);
    this.router.navigate(['/wishlist']);   
  }
  openenquery(){
    this.modalService.open(EnquiryComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  openkyc(){
    this.modalService.open(KycComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  onEditSave(form: FormGroup) {   
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
      this.request.updateProfile(edata).subscribe((response:any) => {    
        if (response.result==true) {
          this.modalService.dismissAll();
          this.toastr.success('Profile Updated','')
  
          form.reset();
          this.getprofile();
          this.sharedService.sendClickEvent();
          
          
        }
        else if (response.result==false) {
          this.modalService.dismissAll();
          this.toastr.error('Profile Updated','')
          form.reset();
        }

      }, (error) => {
        this.modalService.dismissAll();
      });
    }
  }
  editprofileimg(content: any){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'md',
    });
  }
  fileChangeEvent(fileInput: any) {
    
    this.filename=fileInput.target.files[0].name;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        // if (fileInput.target.files[0].size > max_size) {
        //     this.imageError =
        //         'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        //     return false;
        // }

        // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
        //     return false;
        // }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {             
                // console.log(img_height, img_width);
                    const imgBase64Path = e.target.result.split(',')[1];  
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                    console.log("imgBase64Path", imgBase64Path);               
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
}
changeproimg(){

  let edata ={
    id:this.userid,
    filename:this.filename,
    image:this.cardImageBase64
  }
  console.log("edata",edata);
  this.request.changeimg(edata).subscribe((response: any) => {
    this.profilee=response.path;
    if(response.result==true){
      this.modalService.dismissAll();
      this.toastr.success('  Profile Updated','')
      this.getprofile();
      this.sharedService.sendClickEvent();
    }
    else{
      this.modalService.dismissAll();
      this.toastr.error('',response.message)
    }
  },
  (error: any) => {
    console.log("error",error);
  
  });
}

}
