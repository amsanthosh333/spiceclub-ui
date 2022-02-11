import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import{ SharedService} from 'src/app/services/shared.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css'],
  providers: [ToastrService],
})
export class OrderdetailComponent implements OnInit {

 

  //Demo purpose only, Data might come from Api calls/service
  public counts = ["Order Placed","Confirmed","Picked Up","On The Way","On Delivery","Delivered "];
  //  public orderStatus ="Order Placed"
  currentRate = 0;
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
  ord_id: any;
  delivery_status: any;
  orderStatus: any;
  error1: any;
  orderid: any;
  constructor(private http: HttpClient,private router: Router,private modalService: NgbModal,
    private authService: AuthService,private fb: FormBuilder,private request: RequestService,
    private toastr: ToastrService, private toast: ToastrService,private route: ActivatedRoute,
    private sharedService: SharedService,private spinner: NgxSpinnerService,) {
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
    this.ord_id = this.route.snapshot.params['id'];
    console.log("ord_id",this.ord_id);
    this.viewdetail();
    this.viewitem();

    this.register = this.fb.group({ 
      rating:['',[ Validators.required]],
      comment: ['',[ Validators.required]],
    });

  }
  get f() {
    return this.register.controls;
  }

  viewdetail(){
    this.request.vieworderdetail(this.ord_id).subscribe((response: any) => {
      this.Detail=response.data;
      this.orderStatus=this.Detail[0].delivery_status_string;
      this.orderid=this.Detail[0].id;
      console.log("dftgdf",this.orderStatus);
      
      console.log("order detaillllllll",this.Detail);   
    }
    ); 
  }

  viewitem(){

    this.request.vieworderitems(this.ord_id).subscribe((response: any) => {
    this.Items=response.data;   
    this.loader=false;  
      console.log("items",this.Items);
      
    }
    ); 
  }
  addcomment(form: FormGroup,id:any){
    this.error1 = '';
    if (this.register.invalid) {
  
      if(!this.register.get('rating')?.valid){
        this.error1 = '*give star';
      }
      else if ( !this.register.get('comment')?.valid) {
        this.error1 = '*type some comment';
      }
      console.log(this.error1)  
      return;
    }
    else{
      if ((this.register.get('rating'))?.value!=Number){
        form.value.rating=0
        let edata2={
          product_id:id,
          user_id: this.userid,
          rating:form.value.rating,
          comment:form.value.comment,
        }
        console.log(edata2); 
    this.request.addreview(edata2).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Comment  Submitted') { 
        this.toastr.success('Comment  Submitted', '');      
        // this.getcommentsss();
      }
      else  {
        this.toastr.error(res.message);
        console.log("error",res);
  
      }
    }, (error: any) => {
      console.log("error",error);  
    }); }
  }
  }

  addreview(content:any,_id:any){
   this.product_iddd=_id;
   this.modalService.open(content, {
     ariaLabelledBy: 'modal-basic-title',
     size: '50px',
   });
 }
 submitreview(form: FormGroup){
  this.error1 = '';
  console.log("rating",form.value.rating);
  
  if (this.register.invalid) {

    if(!this.register.get('rating')?.valid){
      this.error1 = '*give star';
    }
    else if ( !this.register.get('comment')?.valid) {
      this.error1 = '*type some comment';
    }
    console.log(this.error1)  
    return;
  }
  else{
      let edata2={
        product_id:this.product_iddd,
        user_id: this.userid,
        rating:form.value.rating,
        comment:form.value.comment,
      }
      console.log(edata2); 
  this.request.addreview(edata2).subscribe((res: any) => {
    console.log(res);
    if (res.message == 'Comment  Submitted') { 
      this.toastr.success('Comment  Submitted', '');    
      this.modalService.dismissAll();   
    }
    else  {
      this.toastr.error(res.message);
      console.log("error",res.message);
      this.modalService.dismissAll(); 

    }
  }, (error: any) => {
    console.log("error",error);  
  });
 }
}
proddetail(id:any){
  // console.log("detail page",id);
  window.scroll(0,0);
  this.router.navigate(['productdetail', id]);
  console.log("navigate to category");
}
quickorder(){
  this.spinner.show();
  this.request.quickorder(this.orderid).subscribe((res:any)=>{
    console.log("quickorder res",res)
    if(res.result==true){
      this.spinner.hide();
      this.toastr.success('Added to cart', '');
      this.sharedService.sendClickEvent();
      this.router.navigate(['cart']);
    }
    else{
      console.log("err",res.message);
      this.spinner.hide();
      this.toastr.info('', res.message);
    }
  });
 


}
 
}
