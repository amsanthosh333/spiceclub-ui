import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { windows } from 'ngx-bootstrap-icons';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [ToastrService],
})
export class OrdersComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  userid: any;
  accesstoken: any;
  tokentype: any;Proce: any;
  currentdetail: User;
  Orders: any;
  prdid: any;
  Items: any;
  Detail: any;
  loadingIndicator: boolean | undefined;
  page2: boolean=true;
  page1: boolean=false;
  product_iddd: any;
  register!: FormGroup;
  _values2 = [" 1 ", "2", " 3 "," 4 "," 5 "];
  buyertypeid: any;
  username: any;
  userphone: any;
  useremail: any;
  loader:boolean=true;
  pagenation: any;
  pagess: any;
  constructor(private http: HttpClient,private router: Router,private modalService: NgbModal,
    private authService: AuthService,private fb: FormBuilder,private request: RequestService,
    private toastr: ToastrService, private toast: ToastrService,) {
   this.currentUserSubject = new BehaviorSubject<User>(
     JSON.parse(localStorage.getItem('currentUser')||'{}')
     
   );
   
   this.currentUser = this.currentUserSubject.asObservable();
    this.currentdetail = this.currentUserSubject.value;
    this.userid=this.currentdetail.user.id;
    this.buyertypeid=this.currentdetail.user?.buyertypeid;
    this.accesstoken=this.currentdetail.access_token;
    this.tokentype=this.currentdetail.token_type;
    this.username=this.currentdetail.user.name;
    this.userphone=this.currentdetail.user.phone;
    this.useremail=this.currentdetail.user.email;
    console.log("currentuserid=", this.userid);
    console.log("currentuserdetail=", this.currentdetail);
  }

  ngOnInit(): void {
    window.scroll(0,0)
    this.getorders();

    this.register = this.fb.group({ 
      rating:[''],
      comment: [''],
   
    });
    }
    get f() {
      return this.register.controls;
      
    }
  getorders(){
    this.request.fetchOrders(this.userid).subscribe((response: any) => {
      this.Orders=response.data;  
      this.pagenation = response.meta
      this.pagess = this.pagenation.links
      this.loader=false; 
      console.log("orders",this.Orders);         
    });
  }

  getpage(url:any){
    // this.loader=true;
    
    this.request.getpage(url).subscribe((response:any)=>{
      this.Orders=response.data;  
      this.pagenation=response.meta;  
      this.pagess=this.pagenation.links;
      window.scroll(0,0);

      console.log("response",response);
     
    })
  }

  orderdetail(id:any){
    // console.log("detail page",id);
    window.scroll(0,0);
    this.router.navigate(['orderdetail', id]);
    console.log("navigate to orderdetails");
  }
  viewrow(Connectdtls:any,content: any){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
this.prdid=Connectdtls.id;
  this. viewdetail();
  this.viewitem();
  }


  viewdetail(){
     this.request.vieworderdetail(this.prdid).subscribe((response: any) => {
   
       this.Detail=response.data;
      //  product_id=this.Peoduct.id;
       console.log("order detail",response);   
       this.page1=false,
       this.page2=true,
       setTimeout(() => {
         this.loadingIndicator = false;
       }, 500);    
     }
     ); 
   }

   viewitem(){
 
     this.request.vieworderitems(this.prdid).subscribe((response: any) => {
     this.Items=response.data;     
       console.log("items",this.Items);
       
     }
     ); 
   }
   addreview(content:any,_id:any){
    this.product_iddd=_id;
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });

  }
  submitreview(form: FormGroup){
    let edata2={
      product_id : this.product_iddd,
      user_id: this.userid,
      rating:""+this.register.controls['rating'].value,
      comment: ""+this.register.controls['comment'].value,
    }
    console.log(edata2);  
    this.request.addreview(edata2).subscribe((res: any) => {
      console.log(res);
      // if (res.message == 'Product added to cart successfully') {       
      // }
      // else  {
      //   console.log("error",res);
  
      // }
    }, (error: any) => {
      console.log("error",error);
    
    });
  
  }
 
}