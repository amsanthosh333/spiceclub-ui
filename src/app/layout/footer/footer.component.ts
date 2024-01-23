import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ToastrService],
})
export class FooterComponent implements OnInit {
  subscribe!: FormGroup;
  error: any;
  facebookurl: any;
  youtubeurl: any;
  instagramurl: any;
  twitterurl: any;
  Paymentmethod: any;
  linkedinurl: any;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any; Proce: any;
  currentdetail: User;
  pinteresturl: any;
  

  constructor(private router: Router,private modalService: NgbModal,private fb: FormBuilder,
     private request: RequestService, private toastr: ToastrService) { 

      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem('currentUser') || '{}')
      );
      this.currentUser = this.currentUserSubject.asObservable();
      this.currentdetail = this.currentUserSubject.value;
      this.userid = this.currentdetail.user?.id;
      this.accesstoken = this.currentdetail.access_token;
      this.tokentype = this.currentdetail.token_type;
      
      
      // this.buyertypereal = this.currentdetail.buyertypereal;
      
      if (this.userid == undefined) {
        this.userid = 0;
      } 

     }

  ngOnInit(): void {
    this.subscribe = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
    });

    setTimeout(() => {
      this.getfacebookurl();
      this.getinstagramurl();
      this.gettwitterurl();
      this.getyoutubeurl();
      // this.getpayment();
      this.getlinkedurl();
      this.getpinteresturl();
  
    }, 5000);
   
  }
  
  openlogin(){ 
    if(this.userid==0){
      this.modalService.open(LoginComponent, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'md',
      });
    }
    else{
      this.router.navigate(['/orders']);
    }
   
  }
  mailsubscribe(form: FormGroup) {
    this.error = '';
    if (this.subscribe.invalid) {
      this.error = '* Enter valid email';
      return;
    } else {
      let edata = {
        email: form.value.mail
      };
      this.request.emailsubscribe(edata).subscribe((res: any) => {
        console.log(res);
        if (res.result == true) {
          this.toastr.success(res.message);
          this.subscribe.reset();
        }
        else {
          this.toastr.info(res.message);
          this.subscribe.reset();
        }
      });
    }
  }

  // getpayment() {
  //   this.request.fetchpayment().subscribe((res: any) => {
  //     this.Paymentmethod = res;
  //     console.log("this.Paymentmethod", this.Paymentmethod);
  //   });
  // }

  getfacebookurl() {
    this.request.fetchfacebookurl().subscribe((res: any) => {
      this.facebookurl = res.link;
      // console.log("this.facebookurl", this.facebookurl);
    });
  }
  getyoutubeurl() {
    this.request.fetchyoutubeurl().subscribe((res: any) => {
      this.youtubeurl = res.link;
      // console.log("this.youtubeurl", this.youtubeurl);
    });
  }
  getinstagramurl() {
    this.request.fetchinstagramurl().subscribe((res: any) => {
      this.instagramurl = res.link;
      // console.log("this.instagramurl", this.instagramurl);
    });
  }

  gettwitterurl() {
    this.request.fetchtwitterurl().subscribe((res: any) => {
      this.twitterurl = res.link;
      // console.log("this.twitterurl", this.twitterurl);
    });
  }
  getlinkedurl() {
    this.request.fetchlinkedurl().subscribe((res: any) => {
      this.linkedinurl = res.link;
      // console.log("this.instagramurl", this.instagramurl);
    });
  }
  getpinteresturl() {
   // this.pinteresturl = null;
    this.request.fetchpinteresturl().subscribe((res: any) => {
      this.pinteresturl = res.link;
     
    });
  }
}

