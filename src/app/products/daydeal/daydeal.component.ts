import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service'; 
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user'; 
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-daydeal',
  templateUrl: './daydeal.component.html',
  styleUrls: ['./daydeal.component.css'],
  providers: [NgbRatingConfig,ToastrService],
})
export class DaydealComponent implements OnInit {
  p: number = 1;
  Sort = [
    { id: 'price_low_to_high', value: 'price_low_to_high' },
    { id: 'price_high_to_low', value: 'price_high_to_low' },
    { id: 'new_arrival', value: 'new_arrival' },
    { id: 'popularity', value: 'popularity' },
    { id: 'top_rated', value: 'top_rated' },
  ];
  openproduct: any;
  Peoduct: any;
  loadingIndicator: boolean | undefined;
  page1: boolean=true;
  page2: boolean=false;
  page3: boolean=false;
  Bestsellpro: any;
  currentUserSubject: BehaviorSubject<User>;
  currentUser: Observable<User>;
  prodid:any
   _values1 = [" 0 "," 1 ", "2", " 3 "," 4 "," 5 "," 6 "];
  product_id: any;
  currentPrice: number | undefined;
  currentdetail: User;
  userid: any;
  accesstoken: any;
  tokentype: any;
  quantityy: any;
  choice: any;
  varprise: any;
  varient_value: any;
  stocck: any;
  searchh: any;
  sortprod: any;
  prodcount=[1,2,3,4,5,6,7,8,9,10];
  prodloader: boolean=true;
  Daydealpro: any;
  Monthdealpro: any;
  poploader: boolean=true;
  Product: any;
  pagenation: any;
  pagess: any;
  constructor(private router: Router,private fb: FormBuilder,private request: RequestService
    ,private toastr: ToastrService,config: NgbRatingConfig,) {

      config.max = 5;
      config.readonly = true;

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')||'{}')   
    );

    console.log("currentuser details=", this.currentUserSubject);
    this.currentUser = this.currentUserSubject.asObservable();
     this.currentdetail = this.currentUserSubject.value;
     this.userid=this.currentdetail.user?.id;
     this.accesstoken=this.currentdetail.access_token;
     this.tokentype=this.currentdetail.token_type;
   }

  ngOnInit(): void {
    this. viewdaydeal();
    this.viewmonthdeal();
  }
  viewdaydeal(){
    this.request.getdaydealpro().subscribe((response: any) => {
      this.Daydealpro=response.data;
      this.prodloader=false;
      // this.pagenation=response.meta   
      // this.pagess=this.pagenation.links;
      console.log("Daydealpro",this.Daydealpro);  
    });
  }
  viewmonthdeal(){
    this.request.getmonthdealpro().subscribe((response: any) => {
      this.Monthdealpro=response.data;
      this.poploader=false;
      console.log("Monthdealpro",this.Monthdealpro);  
    });
  }
  // getpage(url:any){
  //   this.request.getpage(url).subscribe((response:any)=>{
  //     this.Product=response.data;
  //     this.pagenation=response.meta;  
  //     this.pagess=this.pagenation.links;
  //     console.log("response",response);
  //     console.log("allproduct",this.Product);
  //   })
  // }
  proddetail(id:any){
    this.router.navigate(['productdetail', id]);
    console.log("navigate to detail");
  }
  addtowishlist(prd_id:any){
    let edata4={
      user_id:this.userid,
      product_id:prd_id
    }
    console.log(edata4);  
    this.request.addtowishlist(edata4).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Product is successfully added to your wishlist') {
        console.log("success",res.message); 
        this.addRecordSuccess() ;     
      }
      else  {
        this.toastr.error(res.message);
        console.log("error",res.message);
      }
    }, (error: any) => {
      console.log("error",error);
    });
  }
  addtocart(_id:any){
    let edata={
      id : _id,
      variant:this?.varient_value.replace(/\s/g, ""),
      user_id: this.userid,
      quantity: this.quantityy  
    }
    console.log(edata);  
    this.request.addtocart(edata).subscribe((res: any) => {
      console.log(res);
      if (res.message == 'Product added to cart successfully') {  
        this.addRecordSuccess();     
      }
      else if(res.message== 'Minimum 1 item(s) should be ordered'){
        this.toastr.info(res.message);
        console.log("minimum 1");
      } 
      else if(res.message== 'Stock out'){
        this.toastr.error(res.message);
        console.log("Stock out");
      }
      else  {
        console.log("error",res);
      }
    }, (error: any) => {
      console.log("error",error);
    
    });
  }
  addRecordSuccess() {
    this.toastr.success('Added Successfully', '');
  }
  editRecordSuccess() {
    this.toastr.success('Edit Record Successfully', '');
  }
  deleteRecordSuccess() {
    this.toastr.error(' Removed Successfully', '');
  }

  
}
